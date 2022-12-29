import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BasicForm from './components/form';
import { FormValuesProps } from './components/form/Form.controls';
import useFormData from './components/form/components/use-form-data';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export default function Home() {
  const formData = useFormData<FormValuesProps>({
    initialValues: {
      name: 'zyyy',
      age: '18',
      profession: { id: '1', name: null },
      birthday: new Date(),
      genre: '2',
      password: '',
      description: '',
    },
    onSubmit: async (data) => console.log(data),
    validationResolver: yupResolver(
      yup
        .object()
        .shape({
          name: yup.string().required('请输入名称'),
          age: yup.string().required('请输入年龄'),
          birthday: yup.string().nullable().required('请选择生日'),
          profession: yup
            .object()
            .shape({
              id: yup.string().nullable().required('请选择职业'),
            })
            .required(),
          password: yup.string().required('请输入密码'),
          genre: yup.string().required('请选择性别'),
          description: yup.string().required('请输入个人介绍'),
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
