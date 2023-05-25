#pragma once
#include "pow_links.hpp"
#include <iostream>

uint8_t fromHex(char x) {
    if (x <= '9') {
        return x - '0';
    }
    return 10 + x - 'a';
}

template<size_t T>
std::array<uint8_t, T> fromHex(const std::string& t) {
    std::array<uint8_t, T> h;
    for (size_t i = 0; i < T; i += 1) {
        h[i] = (fromHex(t[i * 2]) * 16) + (fromHex(t[i * 2 + 1]));
    }
    return h;
}

char toHex(uint8_t x) {
    if (x < 10) {
        return x + '0';
    } else {
        return 'a' + x - 10;
    }
}

template<size_t T>
std::string toHex(std::array<uint8_t, T> h) {
    std::string ans(2 * h.size(), '0');
    for (size_t i = 0; i < h.size(); i += 1) {
        ans[2 * i] = toHex(h[i] >> 4);
        ans[2 * i + 1] = toHex(h[i] & 15);
    }
    return ans;
}
