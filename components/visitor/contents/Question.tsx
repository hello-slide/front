/**********************************************************
 * Question
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Center, Heading, Box, Textarea, Input, Button} from '@chakra-ui/react';
import React from 'react';
import {IoSendOutline} from 'react-icons/io5';
import {Topic} from '../../../@types/socket';
import {VisitorAns} from '../../../@types/socket';

const Question: React.FC<{
  topic: Topic;
  setAns: React.Dispatch<React.SetStateAction<VisitorAns>>;
}> = ({topic, setAns}) => {
  const [text, setText] = React.useState('');
  const [name, setName] = React.useState('');
  const [send, setSend] = React.useState(false);
  const [textErr, setTextErr] = React.useState(false);
  const [nameErr, setNameErr] = React.useState(false);

  React.useEffect(() => {
    setText('');
    setName('');
    setSend(false);
    setTextErr(false);
    setNameErr(false);
  }, [topic.tp]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const result = () => {
    if (topic.an === 0 && name.length === 0) {
      setNameErr(true);
      return;
    }

    if (text.length === 0) {
      setTextErr(true);
      return;
    }

    setTextErr(false);
    setNameErr(false);

    const ans: VisitorAns = {
      ans: {
        t: 'qe',
        qe: text,
      },
    };

    if (topic.an === 0) {
      ans.name = name;
    }

    setSend(true);
    setAns(ans);
  };

  return (
    <Center width="100%" height="100%">
      <Box>
        <Heading marginY="3rem" textAlign="center">
          {topic.tp}
        </Heading>
        {topic.an === 1 || (
          <Input
            placeholder="お名前"
            onChange={nameChange}
            marginTop="2rem"
            isDisabled={send}
            isInvalid={nameErr}
            value={name}
          />
        )}
        <Textarea
          placeholder="回答を入力"
          onChange={handleChange}
          marginTop="2rem"
          isDisabled={send}
          isInvalid={textErr}
          value={text}
        />
        <Center marginTop="2rem">
          <Button
            onClick={result}
            colorScheme="blue"
            rightIcon={<IoSendOutline size="18" />}
            isDisabled={send}
          >
            {send ? '送信済み' : '送信'}
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Question;
