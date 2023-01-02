import MeetMe from '../components/blog/MeetMe';
import Link from 'next/link';
import PostItem from '../components/blog/PostItem';
import styles from '../styles/Home.module.css';
import Meta from '../components/blog/Meta';
import { useState } from 'react';
import { getPosts } from '../utils';

const Home = ({ posts }: { posts: any[] }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const loadMorePosts = async () => {
    const res = await fetch(`/api/posts?page=${currentPageIndex + 1}`); // absolute url is supported here
    const posts = await res.json();

    setFilteredPosts((_posts) => [..._posts, ...posts]);
    setCurrentPageIndex((_pageIndex) => _pageIndex + 1);
  };

  return (
    <>
      <Meta title="Skyloft - Your one stop blog for anything React Native" />
      <MeetMe />
      <Link href="/about">More about me</Link>

      <div className={styles.articleList}>
        <p className={styles.desc}>Newly Published</p>
        {filteredPosts.map((post, index) => (
          <PostItem key={index} post={post} />
        ))}
        <button onClick={loadMorePosts} className={styles.button}>
          Load more
        </button>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = getPosts(1);

  return {
    props: {
      posts,
    },
  };
};
