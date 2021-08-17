/**********************************************************
 * Edit contents: Quiz
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Box,
  Input,
  ButtonGroup,
  IconButton,
  Heading,
  RadioGroup,
  Stack,
  Radio,
  Center,
  Flex,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';
import {
  IoAddOutline,
  IoRemoveOutline,
  IoCheckmarkCircleSharp,
} from 'react-icons/io5';
import {useRecoilState, useRecoilValue} from 'recoil';
import {Quiz} from '../../../@types/pageItem';
import GetPage from '../../../utils/api/getPage';
import {UserDataState, NowPageDataState} from '../../../utils/state/atom';
import ColorPalette from './ColorPalette';

const QuizEdit: React.FC<{id: string}> = ({id}) => {
  const [userData, setUserData] = useRecoilState(UserDataState);
  const nowPageData = useRecoilValue(NowPageDataState);
  const toast = useToast();
  const [load, setLoad] = React.useState(false);

  const [title, setTitle] = React.useState('');
  const [answers, setAnswers] = React.useState<string[]>(['']);
  const [answersText, setAnswersText] = React.useState<string[]>(
    new Array(4).fill('')
  );
  const [currentAnswer, setCurrentAnswer] = React.useState(0);

  const [backgroundColorType, setBGColorType] = React.useState('0');
  const [bgColors, setBgColors] = React.useState<string[]>([]);

  const [textColor, setTextColor] = React.useState('#000000');

  React.useEffect(() => {
    setLoad(true);
    const getPageAPI = new GetPage(
      userData.sessionToken,
      userData.refreshToken,
      (sessionToken, refreshToken, isFailed) => {
        if (isFailed) {
          setUserData({
            name: '',
            image: '',
          });
        } else {
          setUserData(value => ({
            name: value.name,
            image: value.image,
            sessionToken: sessionToken,
            refreshToken: refreshToken,
          }));
        }
      }
    );

    getPageAPI
      .run<Quiz>(nowPageData?.id, id)
      .then(value => {
        if (typeof value !== 'undefined' && value.type === 'quiz') {
          setTitle(value.title);
          setAnswers(new Array(value.numberOfChoices).fill(''));

          const texts = new Array(value.numberOfChoices).fill('');
          value.choices.forEach((value, index) => {
            texts[index] = value.text;
          });
          setAnswersText(texts);

          setCurrentAnswer(value.answerIndex);

          setBGColorType(value.slideDesign.designType);
          if (value.slideDesign.designType === 'mono') {
            setBgColors([value.slideDesign.backgroundColor]);
          } else {
            setBgColors([
              value.slideDesign.backgroundColorStart,
              value.slideDesign.backgroundColorEnd,
            ]);
          }

          setTextColor(value.slideDesign.textColor);
        }
        setLoad(false);
      })
      .catch(error => {
        setLoad(false);
        toast({
          title: 'ページを読み込めませんでした。',
          description: `${error}`,
          status: 'error',
        });
      });
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const element = event.target.value;
    setTitle(element);
  };

  const SelectColor = () => {
    switch (backgroundColorType) {
      case '0':
        return (
          <ColorPalette
            keyIndex="bg1"
            text="背景色"
            color={bgColors[0] || '#f2f2f2'}
            onChange={color => setBgColors([color])}
          />
        );
      case '1':
        return (
          <Stack spacing={4} direction="row">
            <ColorPalette
              keyIndex="bg2"
              text="背景色 左上"
              color={bgColors[0] || '#f2f2f2'}
              onChange={color => {
                const value = [...bgColors];
                value[0] = color;
                setBgColors(value);
              }}
            />
            <ColorPalette
              keyIndex="bg3"
              text="背景色 右下"
              color={bgColors[1] || '#f2f2f2'}
              onChange={color => {
                const value = [...bgColors];
                value[1] = color;
                setBgColors(value);
              }}
            />
          </Stack>
        );
    }
  };

  return (
    <>
      {load ? (
        <Flex
          width="calc(100% - 286px)"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          thickness="3px"
        >
          <Spinner size="xl" color="blue.400" />
        </Flex>
      ) : (
        <Box
          height="calc(100vh - 116px)"
          overflow="scroll"
          width="calc(100% - 286px)"
          css={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Center>
            <Box margin="2rem 1rem 15rem">
              <Box marginY="1rem">
                <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
                  1. クイズの問題
                </Heading>
                <Box>
                  <Input
                    placeholder="問題"
                    size="md"
                    margin="1rem"
                    width="30rem"
                    value={title}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box marginY="1rem">
                <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
                  2. 選択肢
                </Heading>
                {answers.map((_, index) => {
                  return (
                    <Flex key={index} width="100%" margin="1rem">
                      <Box>
                        <Input
                          placeholder={`選択肢 ${index + 1}`}
                          size="md"
                          width="30rem"
                          value={answersText[index]}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const texts = [...answersText];
                            texts[index] = event.target.value;
                            setAnswersText(texts);
                          }}
                        />
                      </Box>
                      <IconButton
                        aria-label="current answer"
                        marginLeft="1rem"
                        borderRadius="full"
                        icon={<IoCheckmarkCircleSharp size="25px" />}
                        color={
                          index === currentAnswer ? 'green.300' : 'gray.300'
                        }
                        variant="ghost"
                        onClick={() => setCurrentAnswer(index)}
                      />
                    </Flex>
                  );
                })}
                <ButtonGroup isAttached size="sm" margin="0 0 .5rem 1rem">
                  <IconButton
                    aria-label="add answer"
                    icon={<IoAddOutline size="20px" />}
                    onClick={() => {
                      if (answers.length <= 3) {
                        const newValue = [...answers];
                        newValue.push('');
                        setAnswers(newValue);
                      }
                    }}
                  />
                  <IconButton
                    aria-label="remove answer"
                    icon={<IoRemoveOutline size="20px" />}
                    onClick={() => {
                      if (answers.length > 1) {
                        if (answers.length - 1 === currentAnswer) {
                          setCurrentAnswer(value => value - 1);
                        }
                        const newValue = [...answers];
                        newValue.pop();
                        setAnswers(newValue);

                        const texts = [...answersText];
                        texts[answers.length - 1] = '';
                        setAnswersText(texts);
                      }
                    }}
                  />
                </ButtonGroup>
              </Box>
              <Box marginY="2rem">
                <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
                  3. 背景の設定
                </Heading>
                <Box marginLeft="1rem">
                  <RadioGroup
                    onChange={setBGColorType}
                    value={backgroundColorType}
                    marginBottom="1rem"
                  >
                    <Stack spacing={4} direction="row">
                      <Radio value="0">塗りつぶし</Radio>
                      <Radio value="1">グラデーション</Radio>
                    </Stack>
                  </RadioGroup>
                  <SelectColor />
                </Box>
              </Box>
              <Box marginY="2rem">
                <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
                  4. 文字色の設定
                </Heading>
                <Box marginLeft="1rem">
                  <ColorPalette
                    keyIndex="txt1"
                    text="文字色"
                    color={textColor}
                    onChange={color => setTextColor(color)}
                  />
                </Box>
              </Box>
            </Box>
          </Center>
        </Box>
      )}
    </>
  );
};

export default QuizEdit;
