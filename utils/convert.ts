import balanced from "balanced-match";
import { Byte, TagObject, parse, stringify } from "nbt-ts";

export interface SignCommandConverterOption {
  front_text: boolean;
  back_text: boolean;
  is_waxed: boolean;
}

export class SignCommandConverter20 {
  option: SignCommandConverterOption;

  constructor(option: SignCommandConverterOption) {
    this.option = option;
  }

  convert(command: string): string {
    return this.convert_sign_nbt(this.convert_block_entity_tag_nbt(command));
  }

  convert_block_entity_tag_nbt(cmd: string): string {
    const idx = cmd.indexOf("BlockEntityTag");
    if (idx === -1) return cmd;

    const sub = cmd.substring(idx);
    const b = balanced("{", "}", sub);
    if (!b) {
      return cmd;
    }

    const nbt = sub.substring(b.start, b.end + 1);

    return cmd.replace(nbt, this.convert_nbt(nbt));
  }

  convert_sign_nbt(cmd: string): string {
    const b = balanced("{", "}", cmd);
    if (!b) {
      return cmd;
    }

    const nbt = cmd.substring(b.start, b.end + 1);

    return cmd.replace(nbt, this.convert_nbt(nbt));
  }

  convert_nbt(snbt: string): string {
    const nbt = parse(snbt) as TagObject;

    if (!nbt) {
      return snbt;
    }

    const text1 = nbt["Text1"];
    const text2 = nbt["Text2"];
    const text3 = nbt["Text3"];
    const text4 = nbt["Text4"];
    const glowing_text = nbt["GlowingText"];
    const color = nbt["Color"];

    if (!(text1 || text2 || text3 || text4 || glowing_text || color)) {
      return snbt;
    }

    delete nbt["Text1"];
    delete nbt["Text2"];
    delete nbt["Text3"];
    delete nbt["Text4"];
    delete nbt["GlowingText"];
    delete nbt["Color"];

    if (this.option.front_text) {
      nbt.front_text = {};
      nbt.front_text.messages = parse(
        `['${text1 || `{"text":""}`}','${text2 || `{"text":""}`}','${
          text3 || `{"text":""}`
        }','${text4 || `{"text":""}`}']`
      );

      if (glowing_text) {
        nbt.front_text.has_glowing_text = glowing_text;
      }

      if (color) {
        nbt.front_text.color = color;
      }
    }

    if (this.option.back_text) {
      nbt.back_text = {};
      nbt.back_text.messages = parse(
        `['${text1 || `{"text":""}`}','${text2 || `{"text":""}`}','${
          text3 || `{"text":""}`
        }','${text4 || `{"text":""}`}']`
      );

      if (glowing_text) {
        nbt.back_text.has_glowing_text = glowing_text;
      }

      if (color) {
        nbt.back_text.color = color;
      }
    }

    if (this.option.is_waxed) {
      nbt.is_waxed = new Byte(1); // 1b
    }

    return stringify(nbt);
  }
}
