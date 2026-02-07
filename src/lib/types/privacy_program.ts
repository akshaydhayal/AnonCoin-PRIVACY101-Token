/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/privacy_program.json`.
 */
export type PrivacyProgram = {
  "address": "GHTszogQs3yHDPU4L5wQDRgcnddQh2nkizuuXAoFTpqG",
  "metadata": {
    "name": "privacyProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "completeLesson",
      "discriminator": [
        77,
        217,
        53,
        132,
        204,
        150,
        169,
        58
      ],
      "accounts": [
        {
          "name": "userProgress",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "signer": true
        }
      ],
      "args": [
        {
          "name": "lessonId",
          "type": "string"
        },
        {
          "name": "points",
          "type": "u32"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "initializeUser",
      "discriminator": [
        111,
        17,
        185,
        250,
        60,
        122,
        38,
        254
      ],
      "accounts": [
        {
          "name": "userProgress",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114,
                  45,
                  112,
                  114,
                  111,
                  103,
                  114,
                  101,
                  115,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "userProgress",
      "discriminator": [
        195,
        16,
        25,
        215,
        192,
        49,
        107,
        204
      ]
    }
  ],
  "types": [
    {
      "name": "userProgress",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "completedLessons",
            "type": {
              "vec": "string"
            }
          },
          {
            "name": "points",
            "type": "u32"
          },
          {
            "name": "allocatedBalance",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
