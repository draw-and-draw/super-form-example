import { Group, Stack, Title, Divider, SimpleGrid, Paper } from '@mantine/core';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FeeNumberInput } from '../Fee/basic-fields';

const BaseCalc = () => {
  const { watch, setValue } = useFormContext();

  useEffect(() => {
    if (watch('baseSalary') < 34188) {
      setValue('socialSecurityRemittanceBase', watch('baseSalary'));
      setValue('providentFundRemittanceBase', watch('baseSalary'));
    } else {
      setValue('socialSecurityRemittanceBase', 34188);
      setValue('providentFundRemittanceBase', 34188);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('baseSalary')]);

  return (
    <Paper shadow="xs" p="md">
      <Group align="flex-start" noWrap>
        <Stack spacing="xs">
          <Title order={5}>工资与基数</Title>
          <FeeNumberInput size="xs" name="baseSalary" label="月收入（未税未扣险金）" />
          <Divider variant="dashed" />
          <FeeNumberInput size="xs" name="additionalDeductions" label="个人所得税附加扣除" />
          <FeeNumberInput size="xs" name="socialSecurityRemittanceBase" label="社保汇缴基数" max={34188} />
          <FeeNumberInput size="xs" name="providentFundRemittanceBase" label="公积金汇缴基数" max={34188} />
        </Stack>
        <Divider orientation="vertical" />
        <Stack spacing="xs" w={190}>
          <Title order={5}>五险一金比率（个人）</Title>
          <SimpleGrid spacing="xs" cols={2}>
            <FeeNumberInput size="xs" name="ratioConfig.basicHousingFundRatio[0]" label="基本住房公积金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.supplementaryHousingFundRatio[0]" label="补充住房公积金" />
          </SimpleGrid>
          <Divider variant="dashed" />
          <SimpleGrid spacing="xs" cols={2}>
            <FeeNumberInput size="xs" name="ratioConfig.pensionRatio[0]" label="养老保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.medicalTreatmentRatio[0]" label="医疗保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.unemploymentRatio[0]" label="失业保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.workInjuryInsurance[0]" label="工伤保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.maternityInsurance[0]" label="生育保险金" disabled />
          </SimpleGrid>
        </Stack>
        <Divider orientation="vertical" />
        <Stack spacing="xs" w={190}>
          <Title order={5}>五险一金比率（企业）</Title>
          <SimpleGrid spacing="xs" cols={2}>
            <FeeNumberInput size="xs" name="ratioConfig.basicHousingFundRatio[1]" label="基本住房公积金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.supplementaryHousingFundRatio[1]" label="补充住房公积金" />
          </SimpleGrid>
          <Divider variant="dashed" />
          <SimpleGrid spacing="xs" cols={2}>
            <FeeNumberInput size="xs" name="ratioConfig.pensionRatio[1]" label="养老保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.medicalTreatmentRatio[1]" label="医疗保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.unemploymentRatio[1]" label="失业保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.workInjuryInsurance[1]" label="工伤保险金" disabled />
            <FeeNumberInput size="xs" name="ratioConfig.maternityInsurance[1]" label="生育保险金" disabled />
          </SimpleGrid>
        </Stack>
      </Group>
    </Paper>
  );
};

export default BaseCalc;
