import React from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  min-height: 500px;
  padding: 16px;

  border: 2px dashed ${({ theme }) => theme.yellow + "90"};
  color: ${({ theme }) => theme.arrow + "80"};

  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;
  overflow: hidden;

  background: ${({ theme }) => theme.card};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 18px;
  object-fit: cover;

  display: block;
`;

const Placeholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 16px;
  font-weight: 500;
`;

const GeneratedImageCard = ({ src, loading }) => {
  console.log("CARD SRC =", src);

  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            sx={{
              color: "inherit",
              width: "24px",
              height: "24px",
            }}
          />
          Generating Your Image...
        </>
      ) : src ? (
        <Image
          src={src}
          alt="Generated AI Image"
          onLoad={() => {
            console.log("✅ IMAGE LOADED");
            console.log("SRC LENGTH =", src?.length);
          }}
          onError={(e) => {
            console.log("❌ IMAGE FAILED");
            console.log("SRC LENGTH =", src?.length);
            console.log(
              "FIRST 100 CHARS =",
              src?.substring(0, 100)
            );

            console.log("ERROR EVENT =", e);
          }}
        />
      ) : (
        <Placeholder>
          Write a prompt to generate image
        </Placeholder>
      )}
    </Container>
  );
};

export default GeneratedImageCard;