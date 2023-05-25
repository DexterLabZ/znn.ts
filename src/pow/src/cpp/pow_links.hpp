#pragma once
#include <array>
#include <stdint.h>

const int kOutSize = 8;
const int kInSize = 32;

typedef std::array<uint8_t, kInSize> InHash;
typedef std::array<uint8_t, kOutSize> Hash;
typedef long long int64;

Hash generate(const InHash& in, int64 difficulty);
Hash benchmark(int64 difficulty);
