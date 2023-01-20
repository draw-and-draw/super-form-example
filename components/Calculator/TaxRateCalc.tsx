import { Group, Stack, Title, Divider, SimpleGrid, Paper, Center, Container, Flex, MantineColor } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { Progress } from '@mantine/core';
import { fixed2 } from './FirstCalc';

interface ProgressSection extends React.ComponentPropsWithRef<'div'> {
  value: number;
  color: MantineColor;
  label?: string;
  tooltip?: React.ReactNode;
}

export const taxRate = [
  [0, 0.03, 0],
  [3000, 0.1, 210],
  [12000, 0.2, 1410],
  [25000, 0.25, 2660],
  [35000, 0.3, 4410],
  [55000, 0.35, 7160],
  [80000, 0.45, 15160],
];

const TaxRateCalc = () => {
  const { watch } = useFormContext();

  const baseSalary =
    watch('baseSalary') -
    (watch('ratioConfig.pensionRatio[0]') +
      watch('ratioConfig.medicalTreatmentRatio[0]') +
      watch('ratioConfig.unemploymentRatio[0]') +
      watch('ratioConfig.workInjuryInsurance[0]') +
      watch('ratioConfig.maternityInsurance[0]')) *
      watch('socialSecurityRemittanceBase') -
    (watch('ratioConfig.basicHousingFundRatio[0]') + watch('ratioConfig.supplementaryHousingFundRatio[0]')) *
      watch('providentFundRemittanceBase');

  const taxCount = Math.max(baseSalary - watch('additionalDeductions') - 5000, 0);

  const config: ProgressSection[] = [];
  const colorConfig = ['red', 'orange', 'yellow', 'lime', 'teal', 'cyan', 'blue', 'violet', 'purple'];

  let taxCountC = taxCount;
  let tax = 0;
  let flag = false;
  taxRate.forEach((item, index) => {
    if (taxCountC && index < taxRate.length - 1) {
      const label = taxRate[index + 1][0] - item[0];
      if (taxCountC > label) {
        taxCountC -= label;
        config.push({
          value: (label / taxCount) * 100,
          color: colorConfig[index],
          label: `${fixed2(label * item[1])}`,
          tooltip: `${fixed2(label * item[1])} = ${fixed2(label)} × ${item[1] * 100}%`,
        });
      } else {
        config.push({
          value: (taxCountC / taxCount) * 100,
          color: colorConfig[index],
          label: `${fixed2(taxCountC * item[1])}`,
          tooltip: `${fixed2(taxCountC * item[1])} = ${fixed2(taxCountC)} × ${item[1] * 100}%`,
        });
        taxCountC = 0;
      }
    } else {
      config.push({
        value: (taxCountC / taxCount) * 100,
        color: colorConfig[index],
        label: `${fixed2(taxCountC * item[1])}`,
        tooltip: `${fixed2(taxCountC * item[1])} = ${fixed2(taxCountC)} × ${item[1] * 100}%`,
      });
    }
    if (!flag && taxCount < item[0]) {
      tax = taxCount * taxRate[index - 1][1] - taxRate[index - 1][2];
      flag = true;
    }
    if (!flag && taxCount >= item[0] && index === taxRate.length - 1) {
      tax = taxCount * item[1] - item[2];
    }
  });

  return (
    <Paper shadow="xs" p="md">
      <Group align="flex-start" noWrap>
        <Stack align="center" spacing="xs" style={{ flex: 1 }}>
          <Title order={5}>记税收入</Title>
          {fixed2(taxCount)}
        </Stack>
        <Divider orientation="vertical" />
        <Stack align="center" spacing="xs" style={{ flex: 1 }}>
          <Title order={5}>扣除税费</Title>
          {fixed2(tax)}
        </Stack>
        <Divider orientation="vertical" />
        <Flex h="59px" align="center" justify="center" style={{ flex: 3 }}>
          <Progress w={350} value={50} size="xl" sections={config} />
        </Flex>
      </Group>
    </Paper>
  );
};

export default TaxRateCalc;
