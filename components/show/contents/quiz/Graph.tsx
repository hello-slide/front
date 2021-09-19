/**********************************************************
 * graph
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/
import {Center} from '@chakra-ui/react';
import React from 'react';
import {BarChart, Bar, XAxis, YAxis, ResponsiveContainer} from 'recharts';
import {useRecoilValue} from 'recoil';
import {Answers} from '../../../../@types/socket';
import {AnswersState} from '../../../../utils/state/atom';
import getFontColor from '../../../../utils/theme/calColor';

const Graph: React.FC<{
  choices: {
    text: string;
    id: string;
  }[];
  color: string;
}> = ({choices, color}) => {
  const [data, setData] = React.useState<{title: string; ansNum: number}[]>([]);
  const answers = useRecoilValue(AnswersState);
  const [answersTexts, setAnswersTexts] = React.useState<string[]>([]);

  React.useEffect(() => {
    const _answersTexts: string[] = [...answersTexts];

    for (const element of answers) {
      const ans = JSON.parse(element.answer) as Answers;
      if (ans.t === 'qz') {
        _answersTexts.push(ans.qz);
      }
    }
    setAnswersTexts(_answersTexts);

    const count = _answersTexts.reduce((prev, current) => {
      prev[current] = (prev[current] || 0) + 1;
      return prev;
    }, {});

    const dataBuf: {title: string; ansNum: number}[] = [];

    for (const value of choices) {
      dataBuf.push({
        title: value.text,
        ansNum: count[value.id],
      });
    }

    setData(dataBuf);
  }, [answers]);

  return (
    <Center fontSize="1.7rem" fontWeight="bold">
      <ResponsiveContainer
        width={window.innerWidth - 100}
        height={window.innerHeight - 250}
      >
        <BarChart width={2000} height={600} data={data} layout="vertical">
          <YAxis
            dataKey="title"
            type="category"
            width={300}
            tickLine={false}
            stroke={color}
          />
          <XAxis type="number" hide />
          <Bar
            dataKey="ansNum"
            fill={color}
            barSize={60}
            label={{fill: getFontColor(color)}}
          />
        </BarChart>
      </ResponsiveContainer>
    </Center>
  );
};

export default Graph;
