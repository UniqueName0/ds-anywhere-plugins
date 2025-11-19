typedef unsigned char   undefined;

typedef unsigned char    byte;
typedef long long    longlong;
typedef unsigned char    uchar;
typedef unsigned int    uint;
typedef unsigned long    ulong;
typedef unsigned long long    ulonglong;
typedef unsigned char    undefined1;
typedef unsigned short    undefined2;
typedef unsigned int    undefined4;
typedef unsigned long long    undefined8;
typedef unsigned short    ushort;
typedef unsigned short    wchar16;
typedef unsigned short    word;
typedef struct Entity Entity, *PEntity;

typedef struct entity_resources entity_resources, *Pentity_resources;

typedef struct entity_definition entity_definition, *Pentity_definition;

typedef union GXBGPltt16 GXBGPltt16, *PGXBGPltt16;

typedef ushort u16;

typedef struct ent_res_file_ids ent_res_file_ids, *Pent_res_file_ids;

typedef ulong u32;

typedef u16 GXRgb;

struct ent_res_file_ids {
    short unknown1;
    short unknown2;
    ushort file1;
    ushort file2;
    ushort flags;
    short flags2;
    short flags3;
    short flags4;
    short unknown;
};

struct entity_resources {
    undefined field0_0x0;
    undefined field1_0x1;
    undefined field2_0x2;
    undefined field3_0x3;
    undefined field4_0x4;
    undefined field5_0x5;
    undefined field6_0x6;
    undefined field7_0x7;
    union GXBGPltt16 *palette2_2;
    undefined1 file_content; /* Created by retype action */
    undefined field10_0xd;
    undefined field11_0xe;
    undefined field12_0xf;
    undefined field13_0x10;
    byte unknown_mask;
    ushort def_id_or_area_id; /* Created by retype action */
    u16 flags; /* Created by retype action */
    byte animation_timer;
    byte animation_timer2;
    struct ent_res_file_ids *file_indices; /* Created by retype action */
    union GXBGPltt16 *palette1; /* Created by retype action */
    union GXBGPltt16 *palette2; /* Created by retype action */
    undefined field22_0x24;
    undefined field23_0x25;
    undefined field24_0x26;
    undefined field25_0x27;
    undefined field26_0x28;
    undefined field27_0x29;
    undefined field28_0x2a;
    undefined field29_0x2b;
    undefined field30_0x2c;
    undefined field31_0x2d;
    undefined field32_0x2e;
    undefined field33_0x2f;
    undefined field34_0x30;
    undefined field35_0x31;
    undefined field36_0x32;
    undefined field37_0x33;
    undefined field38_0x34;
    undefined field39_0x35;
    undefined field40_0x36;
    undefined field41_0x37;
    undefined field42_0x38;
    byte internal_array[15];
    undefined1 possible_subclass; /* Created by retype action */
    undefined field45_0x49;
    undefined field46_0x4a;
    undefined field47_0x4b;
};

struct Entity {
    uint X;
    uint Y;
    int x_velocity;
    int y_velocity;
    int z_velocity;
    uint Z;
    undefined field6_0x18;
    undefined field7_0x19;
    undefined field8_0x1a;
    undefined field9_0x1b;
    undefined field10_0x1c;
    undefined field11_0x1d;
    byte attack_anim_timer;
    byte direction;
    byte state;
    undefined field15_0x21;
    undefined field16_0x22;
    bool is_in_town;
    undefined field18_0x24;
    undefined field19_0x25;
    undefined field20_0x26;
    undefined field21_0x27;
    undefined field22_0x28;
    undefined field23_0x29;
    undefined field24_0x2a;
    undefined field25_0x2b;
    struct entity_resources resources;
    ushort direction3;
    ushort wander_direction_change_timer;
    ushort detect_player_timer;
    byte detect_player_state; /* 00 = none, d8 =  intial, d9 = chasing, da = end */
    undefined field31_0x7f;
    byte pathfind_direction_final;
    undefined field33_0x81;
    undefined field34_0x82;
    undefined field35_0x83;
    ushort field36_0x84; /* 0 = detected */
    undefined field37_0x86;
    undefined field38_0x87;
    undefined field39_0x88;
    undefined field40_0x89;
    undefined field41_0x8a;
    undefined field42_0x8b;
    undefined field43_0x8c;
    undefined field44_0x8d;
    undefined field45_0x8e;
    undefined field46_0x8f;
    undefined field47_0x90;
    undefined field48_0x91;
    undefined field49_0x92;
    undefined field50_0x93;
    undefined field51_0x94;
    undefined field52_0x95;
    undefined field53_0x96;
    undefined field54_0x97;
    struct entity_definition *definition;
    int *related_to_loading;
    undefined field57_0xa0;
    undefined field58_0xa1;
    undefined field59_0xa2;
    undefined field60_0xa3;
    void *file_data;
    ushort file_index;
    undefined field63_0xaa;
    undefined field64_0xab;
    short direction2;
    ushort derived_from_direction2;
    short _during_transition2;
    undefined field68_0xb2;
    undefined field69_0xb3;
    byte entity_index;
    byte anim_related_state;
    byte movement_state;
    byte direction4; /* set by 0x98 */
    ushort field74_0xb8; /* == 0xba */
    ushort field75_0xba; /* == 0xb8 */
    undefined field76_0xbc;
    undefined field77_0xbd;
    undefined field78_0xbe;
    undefined field79_0xbf;
    byte carrying_direction;
    undefined field81_0xc1;
    undefined field82_0xc2;
    undefined field83_0xc3;
    undefined field84_0xc4;
    undefined field85_0xc5;
    undefined field86_0xc6;
    undefined field87_0xc7;
    undefined4 something_to_do_with_attacking;
    undefined4 field89_0xcc;
    undefined field90_0xd0;
    undefined field91_0xd1;
    undefined field92_0xd2;
    undefined field93_0xd3;
    undefined field94_0xd4;
    undefined field95_0xd5;
    undefined field96_0xd6;
    undefined field97_0xd7;
    undefined field98_0xd8;
    undefined field99_0xd9;
    undefined field100_0xda;
    undefined field101_0xdb;
    undefined field102_0xdc;
    undefined field103_0xdd;
    undefined field104_0xde;
    undefined field105_0xdf;
    short general_timer;
    undefined field107_0xe2;
    undefined field108_0xe3;
    ushort disable_input_timer; /* used for blast on player, being carried on enemies */
    undefined field110_0xe6;
    undefined field111_0xe7;
    undefined field112_0xe8;
    ushort field113_0xe9;
    undefined field114_0xeb;
    undefined field115_0xec;
    undefined field116_0xed;
    undefined field117_0xee;
    undefined field118_0xef;
    byte field119_0xf0[3];
    undefined field120_0xf3;
    undefined field121_0xf4;
    undefined field122_0xf5;
    undefined field123_0xf6;
    byte stored_transition_state;
    undefined1 load_flags; /* Created by retype action */
    undefined field126_0xf9;
    undefined1 special_def_index; /* Created by retype action */
    undefined field128_0xfb;
    undefined field129_0xfc;
    undefined field130_0xfd;
    byte area_id;
    undefined field132_0xff;
    undefined field133_0x100;
    undefined field134_0x101;
    byte during_transition;
    undefined field136_0x103;
    undefined field137_0x104;
    undefined field138_0x105;
    undefined field139_0x106;
    undefined field140_0x107;
    int stored_transition_x;
    int stored_transition_y;
    undefined field143_0x110;
    undefined field144_0x111;
    undefined field145_0x112;
    undefined field146_0x113;
    undefined field147_0x114;
    undefined field148_0x115;
    undefined field149_0x116;
    undefined field150_0x117;
    uint related_to_movement_or_camera_state;
};

struct entity_definition {
    byte capabilities;
    byte file_index;
    undefined field2_0x2;
    undefined field3_0x3;
    byte file_index2; /* Created by retype action */
    undefined field5_0x5;
    undefined field6_0x6;
    undefined field7_0x7;
    unsigned int setup_func;
    unsigned int func2;
    unsigned int handle_ent_state_func;
    unsigned int func4;
    unsigned int func5;
    undefined field13_0x1c;
    undefined field14_0x1d;
    undefined field15_0x1e;
    undefined field16_0x1f;
    undefined field17_0x20;
    undefined field18_0x21;
    undefined field19_0x22;
    undefined field20_0x23;
    uint field21_0x24;
    uint field22_0x28;
    ushort field23_0x2c;
    ushort field24_0x2e;
    ushort field25_0x30;
    ushort field26_0x32;
    ushort field27_0x34;
    ushort field28_0x36;
    undefined field29_0x38;
    undefined field30_0x39;
    undefined field31_0x3a;
    undefined field32_0x3b;
    undefined field33_0x3c;
    undefined field34_0x3d;
    undefined field35_0x3e;
    undefined field36_0x3f;
    undefined field37_0x40;
    undefined field38_0x41;
    undefined field39_0x42;
    undefined field40_0x43;
};

union GXBGPltt16 {
    u16 data16[16];
    u32 data32[8];
    GXRgb rgb[16];
};
