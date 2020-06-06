import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText,
} from "@material-ui/core";

import {
  RETRO_FORMAT_1,
  RETRO_FORMAT_2,
  RETRO_FORMAT_3,
  RETRO_FORMAT_4,
  RETRO_FORMAT_5,
  RETRO_FORMAT_6,
  RETRO_FORMAT_7,
  RETRO_FORMAT_8,
} from "../../constants/format.constants";

type RetroFormatSelectProps = {
  onFormatChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function RetroFormatSelect(props: RetroFormatSelectProps) {
  const [format, setFormat] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const newFormat = event.target.value;
    setFormat(event.target.value);
    props.onFormatChange(newFormat);
  }

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="retro-format-native-helper">Retro Format</InputLabel>
      <NativeSelect
        value={format}
        onChange={handleChange}
        inputProps={{
          name: "format",
          id: "retro-format-native-helper",
        }}
      >
        <option value="" />
        <option value={RETRO_FORMAT_1}>
          Went Well, To Improve, Action Items
        </option>
        <option value={RETRO_FORMAT_2}>Start, Stop, Continue</option>
        <option value={RETRO_FORMAT_3}>Mad, Sad, Glad</option>
        <option value={RETRO_FORMAT_4}>
          To Discuss, Discussing, Discussed
        </option>
        <option value={RETRO_FORMAT_5}>Keep, Add, Less, More</option>
        <option value={RETRO_FORMAT_6}>Drop, Add, Keep, Improve</option>
        <option value={RETRO_FORMAT_7}>
          Liked, Learned, Lacked, Longed For
        </option>
        <option value={RETRO_FORMAT_8}>Classic</option>
      </NativeSelect>
      <FormHelperText>Choose your Retro format if you wish!</FormHelperText>
    </FormControl>
  );
}
