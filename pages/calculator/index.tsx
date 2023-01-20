import { Divider, Group, Paper, SimpleGrid, Stack, Title } from '@mantine/core';
import BaseCalc from '../../components/Calculator/BaseCalc';
import CanUseCalc from '../../components/Calculator/CanUseCalc';
import FirstCalc from '../../components/Calculator/FirstCalc';
import TaxRateCalc from '../../components/Calculator/TaxRateCalc';
import { FeeNumberInput, FeeTextInput } from '../../components/Fee/basic-fields';
import Fee from '../../components/Fee/Fee';

type Props = {};

const Index = (props: Props) => {
  const values = {
    baseSalary: 15000,
    additionalDeductions: 1500,
    socialSecurityRemittanceBase: 15000,
    providentFundRemittanceBase: 15000,
    ratioConfig: {
      pensionRatio: [0.08, 0.16],
      medicalTreatmentRatio: [0.02, 0.095],
      unemploymentRatio: [0.005, 0.005],
      basicHousingFundRatio: [0.07, 0.07],
      supplementaryHousingFundRatio: [0, 0],
      workInjuryInsurance: [0, 0.0016],
      maternityInsurance: [0, 0.01],
    },
  };
  return (
    <Fee values={values}>
      <Stack>
        <Title>经济预算编制器</Title>
        <BaseCalc />
        <TaxRateCalc />
        <FirstCalc />
        <CanUseCalc />
      </Stack>
    </Fee>
  );
};

export default Index;
