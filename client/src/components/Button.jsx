import React from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding: 10px 20px;
  border-radius: 8px;

  background: ${({ $variant, theme }) =>
    $variant === "secondary"
      ? theme.secondary
      : theme.primary};

  color: white;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  transition: all 0.3s ease;

  white-space: nowrap;
  min-width: fit-content;
  flex-shrink: 0;

  ${({ $isDisabled }) =>
    $isDisabled &&
    `
      opacity: 0.4;
      cursor: not-allowed;
    `}

  ${({ $isLoading }) =>
    $isLoading &&
    `
      opacity: 0.8;
      cursor: not-allowed;
    `}

  ${({ $flex }) =>
    $flex &&
    `
      flex: 1;
    `}

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const Button = ({
  text,
  isLoading = false,
  isDisabled = false,
  rightIcon,
  leftIcon,
  variant,
  onClick,
  flex,
}) => {
  return (
    <StyledButton
      onClick={() => !isDisabled && !isLoading && onClick?.()}
      $isDisabled={isDisabled}
      $isLoading={isLoading}
      $variant={variant}
      $flex={flex}
    >
      {isLoading && (
        <CircularProgress
          size={18}
          sx={{ color: "inherit" }}
        />
      )}

      {leftIcon}
      <span>{text}</span>
      {isLoading && <span>...</span>}
      {rightIcon}
    </StyledButton>
  );
};

export default Button;