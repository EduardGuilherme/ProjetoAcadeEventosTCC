-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 12/11/2019 às 18:09
-- Versão do servidor: 5.7.26
-- Versão do PHP: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Banco de dados: `app-acadeventos`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `is_administrator` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `password`, `is_administrator`) VALUES
(1, 'thiagooliveira@hotmail.com', '123', 0),
(2, 'administrador@hotmail.com', '123', 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `courses`
--

INSERT INTO `courses` (`id`, `name`) VALUES
(1, 'Análise e Desenvolvimento de Sistemas'),
(2, 'Bacharelado em turismo');

-- --------------------------------------------------------

--
-- Estrutura para tabela `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `image` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `final_date` date DEFAULT NULL,
  `start_time` time NOT NULL,
  `status_event` tinyint(1) DEFAULT NULL,
  `description` text COLLATE utf8_bin,
  `id_institution` int(11) NOT NULL,
  `id_student` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `events`
--

INSERT INTO `events` (`id`, `name`, `image`, `start_date`, `final_date`, `start_time`, `status_event`, `description`, `id_institution`, `id_student`) VALUES
(1, 'Nubank Meetup', 'https://i.ibb.co/c1KDqVq/highres-480544651.png', '2019-11-20', '2019-11-20', '21:00:00', 1, 'Meetup organizado pela Nubank para incentivar mulheres a desenvolver softwares. Venha participar e entender os conceitos de TI.', 1, 1),
(2, 'Baixada Nerd', 'https://i.ibb.co/88v4vdV/download.jpg', '2019-12-05', '2018-12-08', '15:00:00', 1, 'Venha participar do evento mais nerd da baixada. A equipe do baixada nerd estará com mais de 10 palestrantes para comentarmos sobre a importância do TI nas grandes cidades.', 1, 1),
(3, 'Weakly programming', 'https://i.ibb.co/W56xH8r/weekly-bg.png', '2020-02-01', '2020-02-05', '16:00:00', 1, 'Evento de programação, para voce conhecer as mais novas linguagens do mercado.', 1, 1),
(4, 'TechWeek 2019', 'https://i.ibb.co/F0rgXPd/techweek-site.png', '2019-11-08', '2019-11-09', '15:00:00', 1, 'Teste de descrição do evento', 1, 1),
(5, 'Brasil JS', 'https://i.ibb.co/qj35NJZ/maxresdefault.jpg', '2019-12-20', '2019-12-20', '15:00:00', 1, 'Brasil JS, o maior evento da America Latina.', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_event` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Despejando dados para a tabela `favorites`
--

INSERT INTO `favorites` (`id`, `id_user`, `id_event`) VALUES
(1, 3, 10),
(2, 3, 10),
(3, 3, 10),
(4, 3, 10),
(5, 3, 11),
(6, 3, 10),
(7, 3, 13),
(8, 3, 14),
(9, 3, 12),
(10, 3, 12),
(11, 3, 12),
(12, 3, 14),
(13, 3, 14),
(14, 3, 15),
(15, 17, 10),
(16, 1, 2),
(17, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `institutions`
--

CREATE TABLE `institutions` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `cep` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `number` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `institutions`
--

INSERT INTO `institutions` (`id`, `name`, `cep`, `number`) VALUES
(1, 'Instituto Federal de São Paulo', '11533160', 50);

-- --------------------------------------------------------

--
-- Estrutura para tabela `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_bin NOT NULL,
  `image` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin NOT NULL,
  `id_account` int(11) NOT NULL,
  `id_course` int(11) NOT NULL,
  `id_institution` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Despejando dados para a tabela `students`
--

INSERT INTO `students` (`id`, `name`, `image`, `description`, `id_account`, `id_course`, `id_institution`) VALUES
(1, 'Thiago Oliveira', 'https://i.ibb.co/HrqMJr4/22046678-489337371421583-871921837334686151-n.jpg', 'Estudante de Analise e Desenvolvimento de Sistemas. Atualmente trabalha como Desenvolvedor Pleno na empresa Wunderman Thompson, em São Paulo.', 1, 1, 5);

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Índices de tabela `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_institution` (`id_institution`),
  ADD KEY `id_student` (`id_student`);

--
-- Índices de tabela `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `institutions`
--
ALTER TABLE `institutions`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_account` (`id_account`),
  ADD KEY `id_course` (`id_course`),
  ADD KEY `id_institution` (`id_institution`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de tabela `institutions`
--
ALTER TABLE `institutions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
