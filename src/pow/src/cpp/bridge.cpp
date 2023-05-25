#include "pow_links.hpp"
#include "utils.hpp"

#include <stdlib.h>
#include <string.h>

extern "C" {
char* generatePoW(char* data_raw, char* difficulty) {
    InHash data = ::fromHex<kInSize>(std::string(data_raw));
    int64 dif = atoll(difficulty);

    auto out = generate(data, dif);
    auto out_s = toHex(out);
    char* out_raw = (char*)malloc(out_s.size() + 1);
    if (out_raw) {
        memcpy(out_raw, out_s.data(), out_s.size() + 1);
    }
    return out_raw;
}

char* benchmark(char* difficulty) {
    int64 dif = atoll(difficulty);
    auto out = benchmark(dif);
    auto out_s = toHex(out);
    char* out_raw = (char*)malloc(out_s.size() + 1);
    if (out_raw) {
        memcpy(out_raw, out_s.data(), out_s.size() + 1);
    }
    return out_raw;
}

}
