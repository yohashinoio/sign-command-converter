import { CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  IconButton,
  Text,
  useToast,
  CardHeader,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  converted: string;
  onClickClear: () => void;
}

export const ConvertedCard: React.FC<Props> = (props) => {
  const toast = useToast();

  const onClickCopy = () => {
    navigator.clipboard.writeText(props.converted).then(
      () =>
        toast({
          title: "Copy Success",
          status: "success",
          isClosable: true,
          duration: 2000,
        }),
      (err) => {
        toast({
          title: "Copy Failure",
          description: `${err}`,
          status: "error",
          isClosable: true,
        });
      }
    );
  };

  return (
    <Card>
      <CardHeader pb={"10px"}>
        <ButtonGroup>
          <IconButton
            onClick={onClickCopy}
            aria-label={"Copy"}
            icon={<CopyIcon />}
          />
          <IconButton
            onClick={props.onClickClear}
            aria-label={"Clear"}
            icon={<DeleteIcon />}
          />
        </ButtonGroup>
      </CardHeader>
      <CardBody pt={"10px"}>
        <Text>{props.converted}</Text>
      </CardBody>
    </Card>
  );
};
