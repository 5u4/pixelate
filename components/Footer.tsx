import Link from "next/link";
import React from "react";
import { Container } from "./Container";
import { EmailIcon } from "./EmailIcon";
import { GithubIcon } from "./GithubIcon";
import { ItchIcon } from "./ItchIcon";
import { LinkedInIcon } from "./LinkedInIcon";

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-accent-100 border-t border-accent-200">
      <Container>
        <div className="py-20 flex flex-col md:flex-row items-center">
          <h3 className="text-sm md:text-md text-center md:text-left mb-6 md:mb-0">
            Copyright &copy; 2021{year == 2021 ? "" : `-${year}`} Sen Hung Wong.
            All rights reserved.
          </h3>
          <span className="inline-flex text-2xl md:ml-auto md:mt-0 mt-4 justify-center md:justify-start">
            <Link href="mailto:me@wsenh.com" passHref>
              <a
                aria-label="Email"
                rel="noopener"
                className="text-gray-400 hover:text-gray-600 transition"
                target="_blank"
              >
                <EmailIcon />
              </a>
            </Link>
            <Link href="https://github.com/wsenh" passHref>
              <a
                aria-label="Github"
                rel="noopener"
                className="ml-4 text-gray-400 hover:text-gray-600 transition"
                target="_blank"
              >
                <GithubIcon />
              </a>
            </Link>
            <Link href="https://www.linkedin.com/in/senhungwong/" passHref>
              <a
                aria-label="LinkedIn"
                rel="noopener"
                className="ml-4 text-gray-400 hover:text-gray-600 transition"
                target="_blank"
              >
                <LinkedInIcon />
              </a>
            </Link>
            <Link href="https://senhung.itch.io/" passHref>
              <a
                aria-label="Itch.io"
                rel="noopener"
                className="ml-4 text-gray-400 hover:text-gray-600 transition"
                target="_blank"
              >
                <ItchIcon />
              </a>
            </Link>
          </span>
        </div>
      </Container>
    </footer>
  );
};
