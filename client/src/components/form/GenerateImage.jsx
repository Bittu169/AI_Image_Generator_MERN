import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import TextInput from "../TextInput";
import Button from "../Button";
import { CreatePost, GenerateImageFromPrompt } from "../../api";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
`;

const GenerateImage = ({
  createPostLoading,
  setcreatePostLoading,
  generateImageLoading,
  setGenerateImageLoading,
  post,
  setPost,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  /* ---------------- GENERATE IMAGE ---------------- */
  const generateImage = async () => {
    if (!post.prompt?.trim()) {
      setError("Please enter a prompt");
      return;
    }

    try {
      setGenerateImageLoading(true);
      setError("");

      const res = await GenerateImageFromPrompt({
        prompt: post.prompt,
      });

      console.log("FULL API RESPONSE =", res.data);
      console.log("PHOTO EXISTS =", !!res.data.photo);
      console.log(
        "PHOTO LENGTH =",
        res.data.photo ? res.data.photo.length : 0
      );

      setPost((prev) => ({
        ...prev,
        photo: `data:image/png;base64,${res.data.photo}`,
      }));
    } catch (error) {
      console.error("Generate Image Error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to generate image"
      );
    } finally {
      setGenerateImageLoading(false);
    }
  };

  /* ---------------- CREATE POST ---------------- */
  const createPost = async () => {
    if (!post.name || !post.prompt || !post.photo) {
      setError("Please generate an image first");
      return;
    }

    try {
      setcreatePostLoading(true);
      setError("");

      await CreatePost(post);

      navigate("/");
    } catch (error) {
      console.error("Create Post Error:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create post"
      );
    } finally {
      setcreatePostLoading(false);
    }
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with Prompt</Title>

        <Desc>
          Write your prompt according to the image you want to generate!
        </Desc>
      </Top>

      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name"
          name="name"
          value={post.name}
          handelChange={(e) =>
            setPost((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />

        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image"
          name="prompt"
          textArea
          rows="8"
          value={post.prompt}
          handelChange={(e) =>
            setPost((prev) => ({
              ...prev,
              prompt: e.target.value,
            }))
          }
        />

        {error && <ErrorText>{error}</ErrorText>}

        <div>
          * You can post the AI-generated image to showcase in the
          community!
        </div>
      </Body>

      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          flex={true}
          isLoading={generateImageLoading}
          isDisabled={!post.prompt}
          onClick={generateImage}
        />

        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          variant="secondary"
          flex={true}
          isLoading={createPostLoading}
          isDisabled={
            !post.name ||
            !post.prompt ||
            !post.photo
          }
          onClick={createPost}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImage;