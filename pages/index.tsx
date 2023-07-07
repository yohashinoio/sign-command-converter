import { ConvertedCard } from "@/components/ConvertedCard";
import { SignCommandConverter20 } from "@/utils/convert";
import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Flex,
  Spacer,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

export default function Home() {
  const [is_write_front, setIsWriteFront] = React.useState(true);
  const [is_write_back, setIsWriteBack] = React.useState(false);
  const [is_waxed, setIsWaxed] = React.useState(false);

  let [input, setInput] = React.useState("");
  let [converted, setConverted] = React.useState("");

  const onClickConvert = () => {
    let converter = new SignCommandConverter20({
      front_text: is_write_front,
      back_text: is_write_back,
      is_waxed: is_waxed,
    });

    setConverted(converter.convert(input));
  };

  return (
    <>
      <Head>
        <title>Sign command converter</title>
        <meta name="description" content="Convert sign commands" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Center my={8}>
        <Stack w={{ base: "90%", md: "65%", lg: "50%", xl: "35%" }}>
          <Flex>
            <Stack spacing={5} direction={"row"}>
              <Checkbox
                colorScheme={"red"}
                defaultChecked
                onChange={(e) => setIsWriteFront(e.target.checked)}
              >
                Front
              </Checkbox>
              <Checkbox
                colorScheme={"green"}
                onChange={(e) => setIsWriteBack(e.target.checked)}
              >
                Back
              </Checkbox>
              <Checkbox
                colorScheme={"cyan"}
                onChange={(e) => setIsWaxed(e.target.checked)}
              >
                Waxed
              </Checkbox>
            </Stack>

            <Spacer />

            <Stack spacing={1} direction={"row"}>
              <Text>1.19</Text>

              <Center>
                <ArrowForwardIcon />
              </Center>

              <Text>1.20</Text>
            </Stack>
          </Flex>

          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Here is a command you want to convert"}
          />

          <Button onClick={onClickConvert}>Convert</Button>

          <ConvertedCard
            converted={converted}
            onClickClear={() => setConverted("")}
          />
        </Stack>
      </Center>
    </>
  );
}
