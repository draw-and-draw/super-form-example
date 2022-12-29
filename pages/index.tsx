import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import BasicForm from './components/form';
import { FormValuesProps } from './components/form/Form.controls';
import useFormData from './components/form/components/use-form-data';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const formData = useFormData<FormValuesProps>({
    initialValues: { name: 'zyyy', age: '18', profession: { id: '1', name: null } },
    onSubmit: async (data) => console.log(data),
    validationResolver: yupResolver(
      yup
        .object()
        .shape({
          name: yup.string().required('请输入名称'),
          age: yup.string().required('请输入年龄'),
          profession: yup
            .object()
            .shape({
              id: yup.string().nullable().required('请选择职业'),
            })
            .required(),
        })
        .required(),
    ),
  });

  return (
    <>
      <Head>
        <title>React Hook Form Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <BasicForm {...formData} />
      </main>
    </>
  );
}
