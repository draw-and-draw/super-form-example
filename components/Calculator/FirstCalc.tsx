import { Group, Stack, Title, Divider, SimpleGrid, Paper } from '@mantine/core';
import { useFormContext } from 'react-hook-form';
import { FeeNumberInput } from '../Fee/basic-fields';
import { taxRate } from './TaxRateCalc';

const FirstCalc = () => {
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

  const basicHousingFund =
    (watch('ratioConfig.basicHousingFundRatio[0]') + watch('ratioConfig.basicHousingFundRatio[1]')) *
    watch('providentFundRemittanceBase');

  const medicalTreatment =
    (watch('ratioConfig.medicalTreatmentRatio[0]') + watch('ratioConfig.medicalTreatmentRatio[1]')) *
    watch('socialSecurityRemittanceBase');

  const pension =
    (watch('ratioConfig.pensionRatio[0]') + watch('ratioConfig.pensionRatio[1]')) *
    watch('socialSecurityRemittanceBase');

  const taxCount = Math.max(baseSalary - watch('additionalDeductions') - 5000, 0);

  let tax = 0;
  let flag = false;
  taxRate.forEach((item, index) => {
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
          <Title order={5}>到手工资</Title>
          {fixed2(baseSalary - tax)}
        </Stack>
        <Divider orientation="vertical" />
        <Stack align="center" spacing="xs" style={{ flex: 1 }}>
          <Title order={5}>公积金</Title>
          {fixed2(basicHousingFund)}
        </Stack>
        <Divider orientation="vertical" />
        <Stack align="center" spacing="xs" style={{ flex: 1 }}>
          <Title order={5}>医疗保险金</Title>
          {fixed2(medicalTreatment)}
        </Stack>
        <Divider orientation="vertical" />
        <Stack align="center" spacing="xs" style={{ flex: 1 }}>
          <Title order={5}>养老保险金</Title>
          {fixed2(pension)}
        </Stack>
      </Group>
    </Paper>
  );
};

export default FirstCalc;

export const fixed2 = (v?: number | string | null) => {
  return Number(v || 0).toFixed(2);
};
