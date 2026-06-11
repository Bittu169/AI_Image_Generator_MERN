import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/cards/ImageCard";
import { GetPosts } from "../api";
import { CircularProgress } from "@mui/material";

/* ---------------- STYLES ---------------- */

const Container = styled.div`
  padding: 30px 30px;
  padding-bottom: 200px;

  min-height: 100vh;   /* instead of fixed height */
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 6px 10px;
  }
`;

const HeadLine = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

/* ---------------- COMPONENT ---------------- */

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  /* ---------------- FETCH POSTS ---------------- */
  const getPosts = async () => {
    setLoading(true);
    try {
      const res = await GetPosts();
      const data = res?.data?.data || [];

      setPosts(data);
      setFilteredPost(data);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  /* ---------------- SEARCH FILTER ---------------- */
  useEffect(() => {
    if (!search) {
      setFilteredPost(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const promptMatch = post?.prompt
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const authorMatch = post?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      return promptMatch || authorMatch;
    });

    setFilteredPost(filtered);
  }, [search, posts]);

  /* ---------------- UI ---------------- */
  return (
    <Container>
      <HeadLine>
        Explore popular posts in the Community!
        <Span>⦾ Generated with AI ⦾</Span>
      </HeadLine>

      <SearchBar
        search={search}
        handleChange={(e) => setSearch(e.target.value)}
      />

      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}

        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPost.length > 0 ? (
              filteredPost
                .slice()
                .reverse()
                .map((item, index) => (
                  <ImageCard key={item._id || index} item={item} />
                ))
            ) : (
              <div>No Posts Found !!</div>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;