import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const MeetMe = () => {
  return (
    <div>
      <p className={styles.p}>
        这个是我们正在编写的一个自建blog，不使用现成的博客框架，其技术栈是MDX+Nextjs+TS+Mantine+React-Hook-Form
      </p>
    </div>
  );
};

export default MeetMe;
