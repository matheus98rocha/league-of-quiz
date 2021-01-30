import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import db from '../db.json';
import Widget from '../src/components/Widget/index';
import Footer from '../src/components/Footer/index';
import GitHubCorner from '../src/components/GitHubCorner/index';
import QuizBackground from '../src/components/QuizBackground/index';
import QuizLogo from '../src/components/QuizLogo/index';
import Input from '../src/components/Imput/index';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex:1;
//   background-size: cover;
//   background-position: center;
// `;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>League Of Quiz</title>
      </Head>
      <QuizContainer>

        <QuizLogo />

        <Widget
          transition={{ delay: 0, duration: 0.5 }}
          as={motion.section}
          variants={{
            show: { opacity: 1, y: '0' },
            hidden: { opacity: 0, y: '100%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>League Of Legends</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(e) => {
              e.preventDefault();
              router.push(`/quiz?$name=${name}`);
            }}
            >
              <Input
                name="nomeDoUsuario"
                onChange={(e) => setName(e.target.value)}
                placeholder="Diz ai seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Bem vindo a League of ${name}`}
              </Button>
            </form>
          </Widget.Content>

        </Widget>

        <Widget
          transition={{ delay: 0.5, duration: 0.5 }}
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '').split('.');
                return (
                  <li>
                    <Widget.Topic href={linkExterno} target="_blank">
                      {`${projectName}/${githubUser}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          transition={{ delay: 1, duration: 0.5 }}
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/matheus98rocha" />
    </QuizBackground>
  );
}
