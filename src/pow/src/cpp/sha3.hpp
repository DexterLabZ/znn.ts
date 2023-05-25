#include "sha3.h"

extern "C" void sha3_Init256(sha3_context*);
extern "C" void sha3_Update(sha3_context*, const void*, size_t);
extern "C" const void* sha3_Finalize(sha3_context*);
