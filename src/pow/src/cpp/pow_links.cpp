#include "pow_links.hpp"
#include "sha3.hpp"

#include <random>
#include <cstring>

const int kDataSize = 40;

typedef std::array<uint8_t, kDataSize> Data;

void hash(Hash& ans, const Data& in) {
    sha3_context c;
    sha3_Init256(&c);
    sha3_Update(&c, in.data(), in.size());
    const void *digest = sha3_Finalize(&c);
    memcpy(ans.data(), digest, 8);
}

Hash getTarget(int64 difficulty) {
    // set big to 1 << 64
    __int128_t big = (1LL << 62);
    big *= 4;

    __int128_t x = big / difficulty;
    x = big - x;

    Hash h;
    // set little ending encoding
    for (int i = 0; i < 8; i += 1) {
        h[i] = (x >> (i * 8)) & 255;
    }
    return h;
}

bool nextData(Data& d, int max_size) {
    for (int i = 0; i  < max_size; i += 1) {
        d[i] += 1;
        if (d[i] != 0) {
            return true;
        }
    }
    return false;
}

bool greater(const Hash& a, const Hash& b) {
    for (int i = 7; i >= 0; i -= 1) {
        if (a[i] == b[i]) {
            continue;
        }
        return a[i] > b[i];
    }
    return true;
}

Hash getRandomSeed() {
    std::random_device rd;
    std::uniform_int_distribution<int> dist(0, 255);
    Hash h;
    for (size_t i = 0; i < h.size(); i += 1) {
        h[i] = dist(rd);
    }
    return h;
}

Data getData(const Hash& entropy, const InHash& in) {
    Data d;
    for (size_t i = 0; i < entropy.size(); i += 1) {
        d[i] = entropy[i];
    }

    for (size_t i = 0; i < in.size(); i += 1) {
        d[i + entropy.size()] = in[i];
    }

    return d;
}

Hash dataToNonce(const Data& data) {
    Hash h;
    for (size_t i = 0; i < h.size(); i += 1) {
        h[i] = data[i];
    }
    return h;
}

Hash generate(const InHash& in, int64 difficulty) {
    auto target = getTarget(difficulty);
    auto entropy = getRandomSeed();
    auto data = getData(entropy, in);
    Hash h;
    while (true) {
        hash(h, data);
        
        if (greater(h, target)) {
            return dataToNonce(data);
        }

        if (not nextData(data, entropy.size())) {
            data = getData(getRandomSeed(), in);
        }
    }
}

Hash benchmark(int64 difficulty) {
    auto target = getTarget(difficulty);
    auto data = getData(Hash(), InHash());
    Hash h;
    while (true) {
        hash(h, data);
        
        if (greater(h, target)) {
            return dataToNonce(data);
        }

        if (not nextData(data, kOutSize)) {
            return Hash();
        }
    }
}
