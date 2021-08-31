/**********************************************************
 * Edit contents: Question
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {
  Box,
  Input,
  Checkbox,
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
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {Question, SlideDesign} from '../../../@types/pageItem';
import GetPage from '../../../utils/api/getPage';
import {NowPageDataState, PageDataState} from '../../../utils/state/atom';
import ColorPalette from './ColorPalette';

const QuestionEdit: React.FC<{id: string}> = ({id}) => {
  const nowPageData = useRecoilValue(NowPageDataState);
  const toast = useToast();
  const [load, setLoad] = React.useState(false);
  const [isFirst, setIsFirst] = React.useState(true);
  const [isUpdate, setIsUpdate] = React.useState(false);

  const [text, setText] = React.useState('');
  const [isAnonymous, setIsAnonymous] = React.useState(true);

  const [backgroundColorType, setBGColorType] = React.useState('0');
  const [bgColors, setBgColors] = React.useState<string[]>([]);

  const [textColor, setTextColor] = React.useState('#000000');

  const setPageData = useSetRecoilState(PageDataState);

  React.useEffect(() => {
    if (!isFirst) {
      const design: SlideDesign = {
        designType: backgroundColorType === '0' ? 'mono' : 'gradation',
        textColor: textColor,
      };

      if (backgroundColorType === '0') {
        design['backgroundColor'] = bgColors[0];
      } else {
        design['backgroundColorStart'] = bgColors[0];
        design['backgroundColorEnd'] = bgColors[1];
      }

      setPageData({
        text: text,
        id: id,
        type: 'question',
        slideDesign: design,
      } as Question);
    }
  }, [isUpdate]);

  React.useEffect(() => {
    // reset
    setText('');
    setIsAnonymous(true);
    setBGColorType('0');
    setBgColors([]);
    setTextColor('#000000');

    setLoad(true);
    const getPageAPI = new GetPage();

    getPageAPI
      .run<Question>(nowPageData?.id, id)
      .then(value => {
        if (value && value.type === 'question') {
          setText(value.text);

          setBGColorType(value.slideDesign.designType === 'mono' ? '0' : '1');
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
        setIsFirst(false);
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
    setText(element);
    setIsUpdate(value => !value);
  };

  const SelectColor = () => {
    switch (backgroundColorType) {
      case '0':
        return (
          <ColorPalette
            text="背景色"
            color={bgColors[0] || '#f2f2f2'}
            onChange={color => {
              const value = [...bgColors];
              value[0] = color;
              setBgColors(value);
              setIsUpdate(value => !value);
            }}
          />
        );
      case '1':
        return (
          <Stack spacing={4} direction="row">
            <ColorPalette
              text="背景色 左上"
              color={bgColors[0] || '#f2f2f2'}
              onChange={color => {
                const value = [...bgColors];
                value[0] = color;
                setBgColors(value);
                setIsUpdate(value => !value);
              }}
            />
            <ColorPalette
              text="背景色 右下"
              color={bgColors[1] || '#f2f2f2'}
              onChange={color => {
                const value = [...bgColors];
                value[1] = color;
                setBgColors(value);
                setIsUpdate(value => !value);
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
                  1. アンケートの本文
                </Heading>
                <Box>
                  <Input
                    placeholder="本文"
                    size="md"
                    margin="1rem"
                    width="30rem"
                    value={text}
                    onChange={handleChange}
                  />
                </Box>
              </Box>
              <Box marginY="1rem">
                <Heading fontSize="1.5rem" margin="1rem 0 1rem 0">
                  2. アンケートの設定
                </Heading>
                <Box marginLeft="1rem">
                  <Checkbox
                    isChecked={isAnonymous}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setIsAnonymous(event.target.checked)
                    }
                  >
                    匿名
                  </Checkbox>
                </Box>
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
                    text="文字色"
                    color={textColor}
                    onChange={color => {
                      setIsUpdate(value => !value);
                      setTextColor(color);
                    }}
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

export default QuestionEdit;
