import { yupResolver } from '@hookform/resolvers/yup';
import BasicForm from '../components/form';
import useFormData from '../components/form/components/use-form-data';
import { FormValuesProps } from '../components/form/Form.controls';
import * as yup from 'yup';

const Index = () => {
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
  return <BasicForm {...formData} />;
};

export default Index;
