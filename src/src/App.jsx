import React, { useMemo, useState } from "react";

const PRAZO_PADRAO = "Consultar prazo de entrega";

const transportadoras = [
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Brasília/DF",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Brasília",
    destinoUF: "DF",
    prazo: null,
    freteMinimo: 54.19,
    valorTonelada: 474.16,
    gris: 0.00648,
    despacho: 33.87,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Anápolis/GO Polo",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Anápolis",
    destinoUF: "GO",
    prazo: null,
    freteMinimo: 27.09,
    valorTonelada: 270.95,
    gris: 0.00648,
    despacho: 13.55,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Barreiras/BA",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Barreiras",
    destinoUF: "BA",
    prazo: null,
    freteMinimo: 88.05,
    valorTonelada: 880.59,
    gris: 0.00648,
    despacho: 40.64,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x São Paulo/Barueri",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Barueri",
    destinoUF: "SP",
    prazo: null,
    freteMinimo: 94.83,
    valorTonelada: 880.59,
    gris: 0.00648,
    despacho: 40.64,
    pedagioPor100Kg: 6.78,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Brasília/DF",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Brasília",
    destinoUF: "DF",
    sigla: "BSB",
    regiaoTabela: "Brasília",
    prazo: null,
    faixas: { ate10: 104.13, ate20: 134.6, ate30: 156.24, ate50: 211.01, ate75: 292.65, ate100: 386.27, acima100Kg: 3.90466 },
    adValorem: 0.0027,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Goiânia/GO",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    sigla: "GYN",
    regiaoTabela: "Goiânia",
    prazo: null,
    faixas: { ate10: 88.63, ate20: 103.15, ate30: 107.89, ate50: 123.99, ate75: 158.11, ate100: 195.25, acima100Kg: 1.9573 },
    adValorem: 0.0021,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x São Paulo/SP",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "São Paulo",
    destinoUF: "SP",
    sigla: "SAO",
    regiaoTabela: "São Paulo",
    prazo: null,
    faixas: { ate10: 116.95, ate20: 144.58, ate30: 163.91, ate50: 205.19, ate75: 265.95, ate100: 346.55, acima100Kg: 3.53706 },
    adValorem: 0.0037,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Campinas/SP",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Campinas",
    destinoUF: "SP",
    sigla: "CPQ",
    regiaoTabela: "Campinas",
    prazo: null,
    faixas: { ate10: 134.55, ate20: 163.9, ate30: 185.29, ate50: 229.64, ate75: 294.47, ate100: 381.94, acima100Kg: 3.81523 },
    adValorem: 0.004,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Belo Horizonte/MG",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Belo Horizonte",
    destinoUF: "MG",
    sigla: "BHZ",
    regiaoTabela: "Belo Horizonte",
    prazo: null,
    faixas: { ate10: 104.48, ate20: 133.01, ate30: 156.77, ate50: 204.58, ate75: 280.9, ate100: 361.69, acima100Kg: 3.61654 },
    adValorem: 0.0037,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Curitiba/PR",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Curitiba",
    destinoUF: "PR",
    sigla: "CWB",
    regiaoTabela: "Curitiba",
    prazo: null,
    faixas: { ate10: 106.35, ate20: 133.69, ate30: 152.65, ate50: 194.04, ate75: 261.73, ate100: 350.6, acima100Kg: 3.50725 },
    adValorem: 0.0042,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Salvador/BA",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Salvador",
    destinoUF: "BA",
    sigla: "SSA",
    regiaoTabela: "Salvador",
    prazo: null,
    faixas: { ate10: 113.47, ate20: 147.06, ate30: 182.4, ate50: 246.73, ate75: 349.04, ate100: 461.09, acima100Kg: 4.61009 },
    adValorem: 0.0055,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Recife/PE",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Recife",
    destinoUF: "PE",
    sigla: "REC",
    regiaoTabela: "Recife",
    prazo: null,
    faixas: { ate10: 152.11, ate20: 194.28, ate30: 232.09, ate50: 306.79, ate75: 420.39, ate100: 550.71, acima100Kg: 6.32893 },
    adValorem: 0.0064,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
  {
    transportadora: "JAMEF",
    nome: "JAMEF - Aparecida de Goiânia x Palmas/TO",
    tipoTabela: "jamef_faixa",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Palmas",
    destinoUF: "TO",
    sigla: "PMW",
    regiaoTabela: "Palmas",
    prazo: null,
    faixas: { ate10: 127.81, ate20: 161.11, ate30: 189.7, ate50: 247.6, ate75: 338.37, ate100: 440.65, acima100Kg: 4.92802 },
    adValorem: 0.0038,
    fatorCubagem: 201,
    icms: 0.07,
    destaque: "Tabela JAMEF",
  },
];

const transportadorasAccertNova = [
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Nordeste Geral",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Todos",
    destinoUF: "AL",
    todoEstado: true,
    estadosGrupo: ["AL", "CE", "PB", "PE", "RN", "SE"],
    prazo: null,
    freteMinimo: 243.86,
    valorTonelada: 2032.13,
    gris: 0.00864,
    despacho: 81.29,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Bahia Geral",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Todos",
    destinoUF: "BA",
    todoEstado: true,
    prazo: null,
    freteMinimo: 169.34,
    valorTonelada: 1625.7,
    gris: 0.00864,
    despacho: 67.74,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Oeste da Bahia",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Barreiras",
    destinoUF: "BA",
    cidadesGrupo: ["Barreiras", "Bom Jesus da Lapa", "Correntina", "Formosa do Rio Preto", "Ibotirama", "Santa Maria da Vitória", "São Desidério", "Serra Dourada"],
    prazo: null,
    freteMinimo: 115.16,
    valorTonelada: 1083.8,
    gris: 0.00648,
    despacho: 40.64,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Barreiras/Luís Eduardo",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Barreiras",
    destinoUF: "BA",
    cidadesGrupo: ["Barreiras", "Luís Eduardo Magalhães", "Luis Eduardo Magalhaes"],
    prazo: null,
    freteMinimo: 88.05,
    valorTonelada: 880.59,
    gris: 0.00648,
    despacho: 40.64,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Feira/Simões Filho",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Feira de Santana",
    destinoUF: "BA",
    cidadesGrupo: ["Feira de Santana", "Simões Filho", "Simoes Filho"],
    prazo: null,
    freteMinimo: 162.57,
    valorTonelada: 1354.75,
    gris: 0.00864,
    despacho: 54.19,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x DF/Entorno",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Brasília",
    destinoUF: "DF",
    cidadesGrupo: ["Brasília", "Brasilia", "Brasília (Guará)", "Brasilia (Guara)"],
    prazo: null,
    freteMinimo: 54.19,
    valorTonelada: 474.16,
    gris: 0.00648,
    despacho: 33.87,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Formosa/GO",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Formosa",
    destinoUF: "GO",
    cidadesGrupo: ["Formosa", "Luziânia", "Luziania"],
    prazo: null,
    freteMinimo: 54.19,
    valorTonelada: 474.16,
    gris: 0.00648,
    despacho: 33.87,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Nordeste de Goiás",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Alto Paraíso de Goiás",
    destinoUF: "GO",
    cidadesGrupo: ["Alto Paraíso de Goiás", "Alto Paraiso de Goias", "Alvorada do Norte", "Campos Belos", "Cavalcante", "Cristalina", "Planaltina", "Posse", "São João d Aliança", "Sao Joao d Alianca"],
    prazo: null,
    freteMinimo: 54.19,
    valorTonelada: 609.64,
    gris: 0.00648,
    despacho: 40.64,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Anápolis Interior",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Anápolis",
    destinoUF: "GO",
    prazo: null,
    freteMinimo: 40.64,
    valorTonelada: 406.43,
    gris: 0.00648,
    despacho: 20.32,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Anápolis Polo",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Anápolis",
    destinoUF: "GO",
    prazo: null,
    freteMinimo: 27.09,
    valorTonelada: 270.95,
    gris: 0.00648,
    despacho: 13.55,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Piauí Geral",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Todos",
    destinoUF: "PI",
    todoEstado: true,
    prazo: null,
    freteMinimo: 135.48,
    valorTonelada: 1625.7,
    gris: 0.00864,
    despacho: 40.64,
    pedagioPor100Kg: 0.67,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Goiânia x Barueri/SP",
    tipoTabela: "accert_percentual",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Barueri",
    destinoUF: "SP",
    prazo: null,
    freteMinimo: 94.83,
    valorTonelada: 880.59,
    gris: 0.00648,
    despacho: 40.64,
    pedagioPor100Kg: 6.78,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Barueri/SP x Goiânia",
    tipoTabela: "accert_percentual",
    origemCidade: "Barueri",
    origemUF: "SP",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    prazo: null,
    freteMinimo: 81.29,
    valorTonelada: 745.11,
    gris: 0.00648,
    despacho: 33.87,
    pedagioPor100Kg: 6.78,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Campinas/SP x Goiânia",
    tipoTabela: "accert_percentual",
    origemCidade: "Campinas",
    origemUF: "SP",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    prazo: null,
    freteMinimo: 81.29,
    valorTonelada: 745.11,
    gris: 0.00648,
    despacho: 33.87,
    pedagioPor100Kg: 6.78,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
  {
    transportadora: "ACCERT",
    nome: "ACCERT - Sorocaba/SP x Goiânia",
    tipoTabela: "accert_percentual",
    origemCidade: "Sorocaba",
    origemUF: "SP",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    prazo: null,
    freteMinimo: 81.29,
    valorTonelada: 745.11,
    gris: 0.00648,
    despacho: 33.87,
    pedagioPor100Kg: 6.78,
    tdeMinimo: 203.21,
    fatorCubagem: 250,
    icms: 0.07,
    destaque: "Tabela ACCERT",
  },
];

const transportadorasCaiapo = [
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - Goiânia x São Paulo/SP",
    tipoTabela: "caiapo_faixa",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "São Paulo",
    destinoUF: "SP",
    percurso: "GYN=>SAO",
    faixas: { ate50: 129.16, ate100: 167.06, ate150: 193.47, ate200: 257.97, ate250: 308.1, ate300: 352.55, garantiaPeso: 1.19 },
    freteValor: 0.025,
    pedagio: 12.46,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - Goiânia x Campinas/SP",
    tipoTabela: "caiapo_faixa",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Campinas",
    destinoUF: "SP",
    percurso: "GYN=>CPQ",
    faixas: { ate50: 129.16, ate100: 167.06, ate150: 193.47, ate200: 257.97, ate250: 308.1, ate300: 352.55, garantiaPeso: 1.19 },
    freteValor: 0.025,
    pedagio: 12.46,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - Goiânia x Uberlândia/MG",
    tipoTabela: "caiapo_faixa",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Uberlândia",
    destinoUF: "MG",
    percurso: "GYN=>UDI",
    faixas: { ate50: 96.23, ate100: 122.56, ate150: 149.15, ate200: 205.56, ate250: 246.47, ate300: 327.66, garantiaPeso: 1.19 },
    freteValor: 0.021,
    pedagio: 12.46,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - Goiânia x Belo Horizonte/MG",
    tipoTabela: "caiapo_faixa",
    origemCidade: "Goiânia",
    origemUF: "GO",
    destinoCidade: "Belo Horizonte",
    destinoUF: "MG",
    percurso: "GYN=>BHZ",
    faixas: { ate50: 103.56, ate100: 133.45, ate150: 165.26, ate200: 220.67, ate250: 255.73, ate300: 327.66, garantiaPeso: 1.19 },
    freteValor: 0.021,
    pedagio: 12.46,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - São Paulo/SP x Goiânia",
    tipoTabela: "caiapo_faixa",
    origemCidade: "São Paulo",
    origemUF: "SP",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    percurso: "SAO=>GYN",
    faixas: { ate50: 129.16, ate100: 167.06, ate150: 193.47, ate200: 257.97, ate250: 308.1, ate300: 352.55, garantiaPeso: 1.19 },
    freteValor: 0.025,
    pedagio: 10.32,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - Campinas/SP x Goiânia",
    tipoTabela: "caiapo_faixa",
    origemCidade: "Campinas",
    origemUF: "SP",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    percurso: "CPQ=>GYN",
    faixas: { ate50: 129.16, ate100: 167.06, ate150: 193.47, ate200: 257.97, ate250: 308.1, ate300: 352.55, garantiaPeso: 1.19 },
    freteValor: 0.025,
    pedagio: 10.32,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
  {
    transportadora: "CAIAPÓ CARGAS",
    nome: "CAIAPÓ - Belo Horizonte/MG x Goiânia",
    tipoTabela: "caiapo_faixa",
    origemCidade: "Belo Horizonte",
    origemUF: "MG",
    destinoCidade: "Goiânia",
    destinoUF: "GO",
    percurso: "BHZ=>GYN",
    faixas: { ate50: 103.56, ate100: 133.45, ate150: 165.26, ate200: 220.67, ate250: 255.73, ate300: 327.66, garantiaPeso: 1.19 },
    freteValor: 0.021,
    pedagio: 12.46,
    tdeMinimo: 140,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela CAIAPÓ CARGAS",
  },
];

const transportadorasVip = [
  {
    transportadora: "EXPRESS VIP",
    nome: "EXPRESS VIP - Aparecida de Goiânia x Barra do Garças/MT",
    tipoTabela: "vip_kg_percentual",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Barra do Garças",
    destinoUF: "MT",
    cidadesGrupo: ["Barra do Garças", "Pontal do Araguaia", "Aragarças"],
    percentualNF: 0.01,
    valorKg: 0.7,
    freteMinimo: 80,
    tdeMinimo: 200,
    pedagioPor100Kg: 3,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela EXPRESS VIP",
  },
  {
    transportadora: "EXPRESS VIP",
    nome: "EXPRESS VIP - Aparecida de Goiânia x Água Boa/MT",
    tipoTabela: "vip_kg_percentual",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Água Boa",
    destinoUF: "MT",
    cidadesGrupo: ["Nova Xavantina", "Água Boa", "Querência", "Canarana", "Ribeirão Cascalheira"],
    percentualNF: 0.01,
    valorKg: 0.8,
    freteMinimo: 100,
    tdeMinimo: 200,
    pedagioPor100Kg: 3,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela EXPRESS VIP",
  },
  {
    transportadora: "EXPRESS VIP",
    nome: "EXPRESS VIP - Aparecida de Goiânia x Rondonópolis/MT",
    tipoTabela: "vip_kg_percentual",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Rondonópolis",
    destinoUF: "MT",
    cidadesGrupo: ["Rondonópolis", "Primavera do Leste"],
    percentualNF: 0.01,
    valorKg: 0.9,
    freteMinimo: 110,
    tdeMinimo: 200,
    pedagioPor100Kg: 3,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela EXPRESS VIP",
  },
  {
    transportadora: "EXPRESS VIP",
    nome: "EXPRESS VIP - Aparecida de Goiânia x Paranatinga/MT",
    tipoTabela: "vip_kg_percentual",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Paranatinga",
    destinoUF: "MT",
    cidadesGrupo: ["General Carneiro", "Ponte Branca", "Paranatinga", "Araguaiana", "Torixoréu", "Ribeirãozinho", "Araguainha", "Campinápolis", "Cocalinho", "Novo São Joaquim"],
    percentualNF: 0.01,
    valorKg: 1.1,
    freteMinimo: 120,
    tdeMinimo: 200,
    pedagioPor100Kg: 3,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela EXPRESS VIP",
  },
  {
    transportadora: "EXPRESS VIP",
    nome: "EXPRESS VIP - Aparecida de Goiânia x Confresa/MT",
    tipoTabela: "vip_kg_percentual",
    origemCidade: "Aparecida de Goiânia",
    origemUF: "GO",
    destinoCidade: "Confresa",
    destinoUF: "MT",
    cidadesGrupo: ["Confresa", "Vila Rica", "Porto Alegre do Norte", "Santa Cruz do Xingu", "Canabrava do Norte", "Bom Jesus", "Santa Terezinha", "São José do Xingu", "Luciara", "São Félix do Araguaia", "Alto da Boa Vista", "Bom Jesus do Araguaia", "Novo Santo Antônio", "Serra Nova Dourada", "Gaúcha do Norte", "Novo São Joaquim"],
    percentualNF: 0.01,
    valorKg: 1.5,
    freteMinimo: 150,
    tdeMinimo: 200,
    pedagioPor100Kg: 3,
    fatorCubagem: 300,
    icms: 0.07,
    prazo: null,
    destaque: "Tabela EXPRESS VIP",
  },
];

const transportadorasAtivas = [
  ...transportadoras.filter((t) => t.transportadora !== "ACCERT"),
  ...transportadorasAccertNova,
  ...transportadorasVip,
  ...transportadorasCaiapo,
];

const cidadesVip = transportadorasVip.flatMap((t) =>
  t.cidadesGrupo.map((cidade) => ({
    cidade,
    uf: normalizarTexto(cidade) === normalizarTexto("Aragarças") ? "GO" : "MT",
  }))
);

const cidadesPorCep = [
  { cepInicial: "72800000", cepFinal: "72899999", cidade: "Brasília", uf: "DF" },
  { cepInicial: "74000000", cepFinal: "74899999", cidade: "Goiânia", uf: "GO" },
  { cepInicial: "74900000", cepFinal: "74999999", cidade: "Aparecida de Goiânia", uf: "GO" },
  { cepInicial: "75000000", cepFinal: "75199999", cidade: "Anápolis", uf: "GO" },
  { cepInicial: "47800000", cepFinal: "47899999", cidade: "Barreiras", uf: "BA" },
  { cepInicial: "01000000", cepFinal: "05999999", cidade: "São Paulo", uf: "SP" },
  { cepInicial: "06400000", cepFinal: "06499999", cidade: "Barueri", uf: "SP" },
  { cepInicial: "13000000", cepFinal: "13139999", cidade: "Campinas", uf: "SP" },
  { cepInicial: "30000000", cepFinal: "31999999", cidade: "Belo Horizonte", uf: "MG" },
  { cepInicial: "80000000", cepFinal: "82999999", cidade: "Curitiba", uf: "PR" },
  { cepInicial: "40000000", cepFinal: "42599999", cidade: "Salvador", uf: "BA" },
  { cepInicial: "50000000", cepFinal: "52999999", cidade: "Recife", uf: "PE" },
  { cepInicial: "77000000", cepFinal: "77249999", cidade: "Palmas", uf: "TO" },
];

const cidadesAccertTexto = `BA|ABADIA;BA|ABAIRA;BA|ACAJUTIBA;BA|ADUSTINA;BA|AIQUARA;BA|ALMADINA;BA|AMARGOSA;BA|AMELIA RODRIGUES;BA|AMERICA DOURADA;BA|ANAGE;BA|ANDARAI;BA|ANDORINHA;BA|ANGICAL;BA|ANGUERA;BA|ANTAS;BA|ANTONIO CARDOSO;BA|ANTONIO GONCALVES;BA|APORA;BA|APUAREMA;BA|ARACAS;BA|ARACATU;BA|ARATACA;BA|ARATUIPE;BA|AURELINO LEAL;BA|BAIANOPOLIS;BA|BAIXA GRANDE;BA|BANZAE;BA|BARRA;BA|BARRA DO CHOCA;BA|BARRA DO ROCHA;BA|BARREIRAS;BA|BARRO ALTO;BA|BELMONTE;BA|BELO CAMPO;BA|BIRITINGA;BA|BOA VISTA DO TUPIM;BA|BOM JESUS DA LAPA;BA|BONINAL;BA|BONITO;BA|BOTUPORA;BA|BREJOLANDIA;BA|BROTAS DE MACAUBAS;BA|BUERAREMA;BA|BURITIRAMA;BA|CAATIBA;BA|CABACEIRAS DO PARAGUACU;BA|CACHOEIRA;BA|CACULE;BA|CAEM;BA|CAETE-ACU;BA|CAETITE;BA|CAFARNAUM;BA|CAIRU;BA|CALDEIRAO GRANDE;BA|CAMACARI;BA|CAMAMU;BA|CAMPO ALEGRE DE LOURDES;BA|CAMPO FORMOSO;BA|CANAPOLIS;BA|CANARANA;BA|CANAVIEIRAS;BA|CANDEAL;BA|CANDIBA;BA|CAPIM GROSSO;BA|CARAIBAS;BA|CARDEAL DA SILVA;BA|CASA NOVA;BA|CATURAMA;BA|CENTRAL;BA|COARACI;BA|COCOS;BA|CONCEICAO DA FEIRA;BA|CONCEICAO DO COITE;BA|CONDE;BA|CONDEUBA;BA|CONTENDAS DO SINCORA;BA|CORIBE;BA|CORONEL JOAO SA;BA|CORRENTINA;BA|CRAVOLANDIA;BA|CRISOPOLIS;BA|CRISTOPOLIS;BA|CRUZ DAS ALMAS;BA|CURACA;BA|DARIO MEIRA;BA|DIAS D AVILA;BA|DOM BASILIO;BA|ELISIO MEDRADO;BA|ENCRUZILHADA;BA|ERICO CARDOSO;BA|EUNAPOLIS;BA|FATIMA;BA|FEIRA DA MATA;BA|FILADELFIA;BA|FIRMINO ALVES;BA|FLORESTA AZUL;BA|FORMOSA DO RIO PRETO;BA|GANDU;BA|GAVIAO;BA|GENTIO DO OURO;BA|GLORIA;BA|GOVERNADOR MANGABEIRA;BA|GUAJERU;BA|GUARATINGA;BA|IACU;BA|IBIASSUCE;BA|IBICARAI;BA|IBICOARA;BA|IBICUI;BA|IBIPEBA;BA|IBIPITANGA;BA|IBIQUERA;BA|IBIRAPITANGA;BA|IBIRAPUA;BA|IBIRATAIA;BA|IBITIARA;BA|IBITITA;BA|IBOTIRAMA;BA|IGAPORA;BA|IGUAI;BA|ILHEUS;BA|INHAMBUPE;BA|INHAUMAS;BA|IPIAU;BA|IRAMAIA;BA|IRECE;BA|ITABELA;BA|ITABERABA;BA|ITABUNA;BA|ITACARE;BA|ITAETE;BA|ITAGI;BA|ITAGIMIRIM;BA|ITAGUACU DA BAHIA;BA|ITAJU DO COLONIA;BA|ITAJUIPE;BA|ITAMARAJU;BA|ITAMARI;BA|ITAMBE;BA|ITAMIRA;BA|ITANHEM;BA|ITAPARICA;BA|ITAPE;BA|ITAPEBI;BA|ITAPETINGA;BA|ITAPICURU;BA|ITAPITANGA;BA|ITAQUARA;BA|ITARANTIM;BA|ITIRUCU;BA|ITORORO;BA|ITUACU;BA|JAGUAQUARA;BA|JAGUARARI;BA|JAGUARIPE;BA|JANDAIRA;BA|JEREMOABO;BA|JIQUIRICA;BA|JOAO AMARO;BA|JOAO DOURADO;BA|JUAZEIRO;BA|JUCURUCU;BA|JUSSARA;BA|JUSSARI;BA|LAFAIETE COUTINHO;BA|LAGOA REAL;BA|LAJE;BA|LAJEDAO;BA|LAJEDO DO TABOCAL;BA|LAPAO;BA|LICINIO DE ALMEIDA;BA|LIVRAMENTO DE NOSSA SENHORA;BA|LUIS EDUARDO MAGALHAES;BA|MACAJUBA;BA|MACARANI;BA|MACAUBAS;BA|MAETINGA;BA|MAIRI;BA|MALHADA DE PEDRAS;BA|MANSIDAO;BA|MARAGOGIPE;BA|MARAU;BA|MARCIONILIO SOUZA;BA|MASCOTE;BA|MEDEIROS NETO;BA|MIGUEL CALMON;BA|MILAGRES;BA|MIRANGABA;BA|MIRANTE;BA|MORPARA;BA|MORRO DO CHAPEU;BA|MUCUGE;BA|MUCURI;BA|MUNDO NOVO;BA|MUNIZ FERREIRA;BA|MUQUEM DE SAO FRANCISCO;BA|MURITIBA;BA|MUTUIPE;BA|NILO PECANHA;BA|NOVA ITARANA;BA|NOVA REDENCAO;BA|NOVA SOURE;BA|NOVO HORIZONTE;BA|NOVO TRIUNFO;BA|OLINDINA;BA|OLIVEIRA DOS BREJINHOS;BA|OUROLANDIA;BA|PALMAS DE MONTE ALTO;BA|PALMEIRAS;BA|PARATINGA;BA|PAU BRASIL;BA|PAULO AFONSO;BA|PIATA;BA|PILAO ARCADO;BA|PINDAI;BA|PINDOBACU;BA|PINTADAS;BA|PIRAI DO NORTE;BA|PIRIPA;BA|PIRITIBA;BA|PLANALTO;BA|POCOES;BA|PONTO NOVO;BA|PORTO SEGURO;BA|POTIRAGUA;BA|PRADO;BA|PRESIDENTE DUTRA;BA|PRESIDENTE JANIO QUADROS;BA|PRESIDENTE TANCREDO NEVES;BA|QUIXABEIRA;BA|RAFAEL JAMBEIRO;BA|REMANSO;BA|RIACHAO DAS NEVES;BA|RIACHO DE SANTANA;BA|RIBEIRA DO AMPARO;BA|RIBEIRA DO POMBAL;BA|RIBEIRAO DO LARGO;BA|RIO DE CONTAS;BA|RIO DO ANTONIO;BA|RODA VELHA;BA|RODELAS;BA|ROSARIO;BA|RUY BARBOSA;BA|SALINAS DA MARGARIDA;BA|SALOBRO;BA|SALVADOR;BA|SANTA BRIGIDA;BA|SANTA CRUZ CABRALIA;BA|SANTA CRUZ DA VITORIA;BA|SANTA INES;BA|SANTA LUZIA;BA|SANTA MARIA DA VITORIA;BA|SANTA RITA DE CASSIA;BA|SANTA TERESINHA;BA|SANTANA;BA|SANTO ESTEVAO;BA|SAO FELIPE;BA|SAO FELIX;BA|SAO FELIX DO CORIBE;BA|SAO GABRIEL;BA|SAO GONCALO DOS CAMPOS;BA|SAO JOSE DA VITORIA;BA|SAO JOSE DO JACUIPE;BA|SAO MIGUEL DAS MATAS;BA|SAPEACU;BA|SATIRO DIAS;BA|SAUDE;BA|SEABRA;BA|SEBASTIAO LARANJEIRAS;BA|SENHOR DO BONFIM;BA|SENTO SE;BA|SERRA DO RAMALHO;BA|SERRA DOURADA;BA|SERRA PRETA;BA|SITIO DO MATO;BA|SITIO DO QUINTO;BA|SOUTO SOARES;BA|TABOCAS DO BREJO VELHO;BA|TANHACU;BA|TANQUE NOVO;BA|TAPEROA;BA|TAPIRAMUTA;BA|TEOLANDIA;BA|TREMEDAL;BA|UIBAI;BA|UMBURANAS;BA|UNA;BA|URANDI;BA|UTINGA;BA|VALENCA;BA|VARZEA DA ROCA;BA|VARZEA DO POCO;BA|VERA CRUZ;BA|VEREDA;BA|VITORIA DA CONQUISTA;BA|WANDERLEY;BA|XIQUE-XIQUE;DF|BRASILIA;DF|BRASILIA (BRAZLANDIA);DF|BRASILIA (CANDANGOLANDIA);DF|BRASILIA (CEILANDIA);DF|BRASILIA (CRUZEIRO);DF|BRASILIA (GAMA);DF|BRASILIA (GUARA);DF|BRASILIA (LAGO NORTE);DF|BRASILIA (LAGO SUL);DF|BRASILIA (NUCLEO BANDEIRANTE);DF|BRASILIA (PARANOA);DF|BRASILIA (PLANALTINA);DF|BRASILIA (RIACHO FUNDO);DF|BRASILIA (SAMAMBAIA);DF|BRASILIA (SAO SEBASTIAO);DF|BRASILIA (SOBRADINHO);DF|BRASILIA (TAGUATINGA);GO|ABADIA DE GOIAS;GO|ABADIANIA;GO|AGUA FRIA DE GOIAS;GO|AGUA LIMPA;GO|AGUAS LINDAS DE GOIAS;GO|ALEXANIA;GO|ALTO PARAISO DE GOIAS;GO|ALVORADA DO NORTE;GO|ANAPOLIS;GO|APARECIDA DE GOIANIA;GO|BOM JESUS;GO|BURITINOPOLIS;GO|CABECEIRAS;GO|CACHOEIRA DOURADA;GO|CALDAS NOVAS;GO|CAMPO LIMPO DE GOIAS;GO|CAMPOS BELOS;GO|CAVALCANTE;GO|CIDADE OCIDENTAL;GO|COCALZINHO DE GOIAS;GO|CORUMBAIBA;GO|CRISTALINA;GO|DAMIANOPOLIS;GO|DIVINOPOLIS DE GOIAS;GO|FLORES DE GOIAS;GO|FORMOSA;GO|GAMELEIRA DE GOIAS;GO|GOIANAPOLIS;GO|GOIANIA;GO|GOIANIRA;GO|GOIATUBA;GO|GUARANI DE GOIAS;GO|HIDROLANDIA;GO|IACIARA;GO|INHUMAS;GO|ITUMBIARA;GO|LUZIANIA;GO|MAMBAI;GO|MIMOSO DE GOIAS;GO|MONTE ALEGRE DE GOIAS;GO|MORRINHOS;GO|NEROPOLIS;GO|NOVA ROMA;GO|NOVO GAMA;GO|PADRE BERNARDO;GO|PANAMA;GO|PIRENOPOLIS;GO|PLANALTINA;GO|PONTALINA;GO|POSSE;GO|PROFESSOR JAMIL;GO|RIO QUENTE;GO|SANTO ANTONIO DO DESCOBERTO;GO|SAO DOMINGOS;GO|SAO GABRIEL DE GOIAS;GO|SAO JOAO D ALIANCA;GO|SENADOR CANEDO;GO|SIMOLANDIA;GO|SITIO D ABADIA;GO|TERESINA DE GOIAS;GO|TEREZOPOLIS DE GOIAS;GO|TRINDADE;GO|VILA BOA;PI|BAIXA GRANDE DO RIBEIRO;PI|BOM JESUS;PI|CORRENTE;PI|CRISTINO CASTRO;PI|CURRAIS;PI|GILBUES;PI|MONTE ALEGRE DO PIAUI;PI|PALMEIRA DO PIAUI;PI|PARNAGUA;PI|REDENCAO DO GURGUEIA;PI|RIACHO FRIO;PI|RIBEIRO GONCALVES;PI|SAO GONCALO DO GURGUEIA;PI|SAO JOSE DO DIVINO;PI|SEBASTIAO LEAL;PI|TERESINA;PI|URUCUI;SP|ADAMANTINA;SP|ADOLFO;SP|AGUAI;SP|AGUAS DA PRATA;SP|AGUAS DE LINDOIA;SP|AGUAS DE SANTA BARBARA;SP|AGUAS DE SAO PEDRO;SP|AGUDOS;SP|AGULHA;SP|ALAMBARI;SP|ALFREDO GUEDES;SP|ALFREDO MARCONDES;SP|ALTAIR;SP|ALTINOPOLIS;SP|ALTO ALEGRE;SP|ALTO PORA;SP|ALUMINIO;SP|ALVARES FLORENCE;SP|ALVARES MACHADO;SP|ALVARO DE CARVALHO;SP|ALVINLANDIA;SP|AMADEU AMARAL;SP|AMELIOPOLIS;SP|AMERICANA;SP|AMERICO BRASILIENSE;SP|AMERICO DE CAMPOS;SP|AMPARO;SP|ANA DIAS;SP|ANALANDIA;SP|ANDRADINA;SP|ANGATUBA;SP|ANHEMBI;SP|ANHUMAS;SP|APARECIDA;SP|APARECIDA D OESTE;SP|APARECIDA DE SAO MANUEL;SP|APIAI;SP|ARACARIGUAMA;SP|ARACATUBA;SP|ARACOIABA DA SERRA;SP|ARAMINA;SP|ARANDU;SP|ARAPEI;SP|ARARAQUARA;SP|ARARAS;SP|ARAXAS;SP|ARCO-IRIS;SP|AREALVA;SP|AREIAS;SP|AREIOPOLIS;SP|ARIRANHA;SP|ARTUR NOGUEIRA;SP|ARUJA;SP|ASPASIA;SP|ASSIS;SP|ATIBAIA;SP|ATLANTIDA;SP|AURIFLAMA;SP|AVAI;SP|AVANHANDAVA;SP|AVARE;SP|AVENCAS;SP|BADY BASSITT;SP|BALBINOS;SP|BALSAMO;SP|BANANAL;SP|BARAO DE ANTONINA;SP|BARBOSA;SP|BARIRI;SP|BARRA BONITA;SP|BARRA DO CHAPEU;SP|BARRA DO TURVO;SP|BARRETOS;SP|BARRINHA;SP|BARUERI;SP|BASTOS;SP|BATATAIS;SP|BAURU;SP|BEBEDOURO;SP|BENTO DE ABREU;SP|BERNARDINO DE CAMPOS;SP|BERTIOGA;SP|BILAC;SP|BIRIGUI;SP|BIRITIBA-MIRIM;SP|BOA ESPERANCA DO SUL;SP|BOCAINA;SP|BOFETE;SP|BOITUVA;SP|BOM FIM DO BOM JESUS;SP|BOM JESUS DOS PERDOES;SP|BOM SUCESSO DE ITARARE;SP|BORA;SP|BORACEIA;SP|BORBOREMA;SP|BOREBI;SP|BOTAFOGO;SP|BOTUCATU;SP|BRAGANCA PAULISTA;SP|BRAUNA;SP|BREJO ALEGRE;SP|BRODOWSKI;SP|BROTAS;SP|BURI;SP|BURITAMA;SP|BURITIZAL;SP|CABRALIA PAULISTA;SP|CABREUVA;SP|CACAPAVA;SP|CACHOEIRA PAULISTA;SP|CACONDE;SP|CAFELANDIA;SP|CAIABU;SP|CAIEIRAS;SP|CAIUA;SP|CAJAMAR;SP|CAJATI;SP|CAJOBI;SP|CAJURU;SP|CAMPINA DO MONTE ALEGRE;SP|CAMPINAL;SP|CAMPINAS;SP|CAMPO LIMPO PAULISTA;SP|CAMPOS DO JORDAO;SP|CAMPOS NOVOS PAULISTA;SP|CANANEIA;SP|CANAS;SP|CANDIDO MOTA;SP|CANDIDO RODRIGUES;SP|CANITAR;SP|CAPAO BONITO;SP|CAPELA DO ALTO;SP|CAPIVARI;SP|CARAGUATATUBA;SP|CARAPICUIBA;SP|CARDOSO;SP|CARUARA;SP|CASA BRANCA;SP|CASSIA DOS COQUEIROS;SP|CASTILHO;SP|CATANDUVA;SP|CATIGUA;SP|CEDRAL;SP|CERQUEIRA CESAR;SP|CERQUILHO;SP|CESARIO LANGE;SP|CHARQUEADA;SP|CHAVANTES;SP|CLEMENTINA;SP|COLINA;SP|COLOMBIA;SP|CONCEICAO DE MONTE ALEGRE;SP|CONCHAL;SP|CONCHAS;SP|CORDEIROPOLIS;SP|COROADOS;SP|CORONEL GOULART;SP|CORONEL MACEDO;SP|CORUMBATAI;SP|COSMOPOLIS;SP|COSMORAMA;SP|COSTA MACHADO;SP|COTIA;SP|CRAVINHOS;SP|CRISTAIS PAULISTA;SP|CRUZALIA;SP|CRUZEIRO;SP|CUBATAO;SP|CUIABA PAULISTA;SP|CUNHA;SP|DESCALVADO;SP|DIADEMA;SP|DIRCE REIS;SP|DIVINOLANDIA;SP|DOBRADA;SP|DOIS CORREGOS;SP|DOLCINOPOLIS;SP|DOMELIA;SP|DOURADO;SP|DRACENA;SP|DUARTINA;SP|DUMONT;SP|ECHAPORA;SP|ELDORADO;SP|ELIAS FAUSTO;SP|ELISIARIO;SP|EMBAUBA;SP|EMBU DAS ARTES;SP|EMBU-GUACU;SP|EMILIANOPOLIS;SP|ENEIDA;SP|ENGENHEIRO COELHO;SP|ENGENHEIRO SCHMIDT;SP|ESPERANCA DOESTE;SP|ESPIGAO;SP|ESPIRITO SANTO DO PINHAL;SP|ESPIRITO SANTO DO TURVO;SP|ESTIVA GERBI;SP|ESTRELA D OESTE;SP|ESTRELA DO NORTE;SP|EUCLIDES DA CUNHA PAULISTA;SP|FARTURA;SP|FERNANDO PRESTES;SP|FERNANDOPOLIS;SP|FERNAO;SP|FERRAZ DE VASCONCELOS;SP|FLORA RICA;SP|FLOREAL;SP|FLORESTA DO SUL;SP|FLORIDA PAULISTA;SP|FLORINEA;SP|FRANCA;SP|FRANCISCO MORATO;SP|FRANCO DA ROCHA;SP|FRUTAL DO CAMPO;SP|GABRIEL MONTEIRO;SP|GALIA;SP|GARCA;SP|GARDENIA;SP|GASTAO VIDIGAL;SP|GAVIAO PEIXOTO;SP|GENERAL SALGADO;SP|GETULINA;SP|GLICERIO;SP|GUAIANAS;SP|GUAICARA;SP|GUAIMBE;SP|GUAIRA;SP|GUAPIACU;SP|GUAPIARA;SP|GUARA;SP|GUARACAI;SP|GUARACI;SP|GUARACIABA DOESTE;SP|GUARANI D OESTE;SP|GUARANTA;SP|GUARARAPES;SP|GUARAREMA;SP|GUARATINGUETA;SP|GUAREI;SP|GUARIBA;SP|GUARIROBA;SP|GUARUJA;SP|GUARULHOS;SP|GUATAPARA;SP|GUZOLANDIA;SP|HERCULANDIA;SP|HOLAMBRA;SP|HORTOLANDIA;SP|IACANGA;SP|IACRI;SP|IARAS;SP|IBATE;SP|IBIRA;SP|IBIRAREMA;SP|IBITINGA;SP|IBITIUVA;SP|IBIUNA;SP|ICEM;SP|IEPE;SP|IGACABA;SP|IGARACU DO TIETE;SP|IGARAI;SP|IGARAPAVA;SP|IGARATA;SP|IGUAPE;SP|ILHA COMPRIDA;SP|ILHA SOLTEIRA;SP|ILHABELA;SP|INDAIA DO AGUAPEI;SP|INDAIATUBA;SP|INDIANA;SP|INDIAPORA;SP|INUBIA PAULISTA;SP|IPAUSSU;SP|IPERO;SP|IPEUNA;SP|IPIGUA;SP|IPORANGA;SP|IPUA;SP|IRACEMAPOLIS;SP|IRAPUA;SP|IRAPURU;SP|ITABERA;SP|ITAI;SP|ITAJOBI;SP|ITAJU;SP|ITANHAEM;SP|ITAOCA;SP|ITAPECERICA DA SERRA;SP|ITAPETININGA;SP|ITAPEVA;SP|ITAPEVI;SP|ITAPIRA;SP|ITAPIRAPUA PAULISTA;SP|ITAPOLIS;SP|ITAPORANGA;SP|ITAPUI;SP|ITAPURA;SP|ITAQUAQUECETUBA;SP|ITARARE;SP|ITARIRI;SP|ITATIBA;SP|ITATINGA;SP|ITIRAPINA;SP|ITIRAPUA;SP|ITOBI;SP|ITORORO DO PARANAPANEMA;SP|ITU;SP|ITUPEVA;SP|ITUVERAVA;SP|IUBATINGA;SP|JABORANDI;SP|JABOTICABAL;SP|JACAREI;SP|JACI;SP|JACIPORA;SP|JACUBA;SP|JACUPIRANGA;SP|JAFA;SP|JAGUARIUNA;SP|JALES;SP|JAMAICA;SP|JAMBEIRO;SP|JANDIRA;SP|JARDINOPOLIS;SP|JARINU;SP|JATOBA;SP|JAU;SP|JERIQUARA;SP|JOANOPOLIS;SP|JOAO RAMALHO;SP|JOSE BONIFACIO;SP|JULIO MESQUITA;SP|JUMIRIM;SP|JUNDIAI;SP|JUNQUEIROPOLIS;SP|JUQUIA;SP|JUQUITIBA;SP|JURUCE;SP|LAGOA AZUL;SP|LAGOINHA;SP|LARANJAL PAULISTA;SP|LAVINIA;SP|LAVRINHAS;SP|LEME;SP|LENCOIS PAULISTA;SP|LIMEIRA;SP|LINDOIA;SP|LINS;SP|LORENA;SP|LOURDES;SP|LOUVEIRA;SP|LUCELIA;SP|LUCIANOPOLIS;SP|LUIS ANTONIO;SP|LUIZIANIA;SP|LUPERCIO;SP|LUTECIA;SP|MACATUBA;SP|MACAUBAL;SP|MACEDONIA;SP|MAGDA;SP|MAIRINQUE;SP|MAIRIPORA;SP|MANDURI;SP|MARABA PAULISTA;SP|MARACAI;SP|MARAPOAMA;SP|MARCONDESIA;SP|MARIAPOLIS;SP|MARILIA;SP|MARINOPOLIS;SP|MARTINOPOLIS;SP|MATAO;SP|MAUA;SP|MENDONCA;SP|MERIDIANO;SP|MESOPOLIS;SP|MIGUELOPOLIS;SP|MINEIROS DO TIETE;SP|MIRA ESTRELA;SP|MIRACATU;SP|MIRANDOPOLIS;SP|MIRANTE DO PARANAPANEMA;SP|MIRASSOL;SP|MIRASSOLANDIA;SP|MOCOCA;SP|MOGI DAS CRUZES;SP|MOGI GUACU;SP|MOGI MIRIM;SP|MOMBUCA;SP|MONCOES;SP|MONGAGUA;SP|MONTALVAO;SP|MONTE ALEGRE DO SUL;SP|MONTE ALTO;SP|MONTE APRAZIVEL;SP|MONTE AZUL PAULISTA;SP|MONTE CASTELO;SP|MONTE MOR;SP|MONTE VERDE PAULISTA;SP|MONTEIRO LOBATO;SP|MORRO AGUDO;SP|MORUNGABA;SP|MOTUCA;SP|MURUTINGA DO SUL;SP|NANTES;SP|NARANDIBA;SP|NATIVIDADE DA SERRA;SP|NAZARE PAULISTA;SP|NEVES PAULISTA;SP|NHANDEARA;SP|NIPOA;SP|NOVA ALIANCA;SP|NOVA CAMPINA;SP|NOVA CANAA PAULISTA;SP|NOVA CASTILHO;SP|NOVA EUROPA;SP|NOVA GRANADA;SP|NOVA GUATAPORANGA;SP|NOVA INDEPENDENCIA;SP|NOVA ITAPIREMA;SP|NOVA LUZITANIA;SP|NOVA ODESSA;SP|NOVA PATRIA;SP|NOVAIS;SP|NOVO HORIZONTE;SP|NUPORANGA;SP|OASIS;SP|OCAUCU;SP|OLEO;SP|OLIMPIA;SP|ONDA VERDE;SP|ORIENTE;SP|ORINDIUVA;SP|ORLANDIA;SP|OSASCO;SP|OSCAR BRESSANE;SP|OSVALDO CRUZ;SP|OURINHOS;SP|OURO VERDE;SP|OUROESTE;SP|PACAEMBU;SP|PADRE NOBREGA;SP|PALESTINA;SP|PALMARES PAULISTA;SP|PALMEIRA D OESTE;SP|PALMITAL;SP|PANORAMA;SP|PARAGUACU PAULISTA;SP|PARAIBUNA;SP|PARAISO;SP|PARANAPANEMA;SP|PARANAPUA;SP|PARAPUA;SP|PARDINHO;SP|PARIQUERA-ACU;SP|PARISI;SP|PATROCINIO PAULISTA;SP|PAULICEIA;SP|PAULINIA;SP|PAULISTANIA;SP|PAULO DE FARIA;SP|PEDERNEIRAS;SP|PEDRA BELA;SP|PEDRANOPOLIS;SP|PEDREGULHO;SP|PEDREIRA;SP|PEDRINHAS PAULISTA;SP|PEDRO BARROS;SP|PEDRO DE TOLEDO;SP|PENAPOLIS;SP|PEREIRA BARRETO;SP|PEREIRAS;SP|PERUIBE;SP|PIACATU;SP|PIEDADE;SP|PILAR DO SUL;SP|PINDAMONHANGABA;SP|PINDORAMA;SP|PINHALZINHO;SP|PIONEIROS;SP|PIQUEROBI;SP|PIQUETE;SP|PIRACAIA;SP|PIRACICABA;SP|PIRAJU;SP|PIRAJUI;SP|PIRANGI;SP|PIRAPORA DO BOM JESUS;SP|PIRAPOZINHO;SP|PIRASSUNUNGA;SP|PIRATININGA;SP|PITANGUEIRAS;SP|PLANALTO;SP|PLANALTO DO SUL;SP|PLATINA;SP|POA;SP|POLONI;SP|POMPEIA;SP|PONGAI;SP|PONTAL;SP|PONTALINDA;SP|PONTES GESTAL;SP|POPULINA;SP|PORANGABA;SP|PORTO FELIZ;SP|PORTO FERREIRA;SP|POTIM;SP|POTIRENDABA;SP|POTUNDUVA;SP|PRACINHA;SP|PRADOPOLIS;SP|PRAIA GRANDE;SP|PRATANIA;SP|PRESIDENTE ALVES;SP|PRESIDENTE BERNARDES;SP|PRESIDENTE EPITACIO;SP|PRESIDENTE PRUDENTE;SP|PRESIDENTE VENCESLAU;SP|PRIMAVERA;SP|PROMISSAO;SP|QUADRA;SP|QUATA;SP|QUEIROZ;SP|QUELUZ;SP|QUINTANA;SP|RAFARD;SP|RANCHARIA;SP|REDENCAO DA SERRA;SP|REGENTE FEIJO;SP|REGINOPOLIS;SP|REGISTRO;SP|RESTINGA;SP|RIBEIRA;SP|RIBEIRAO BONITO;SP|RIBEIRAO BRANCO;SP|RIBEIRAO CORRENTE;SP|RIBEIRAO DO SUL;SP|RIBEIRAO DOS INDIOS;SP|RIBEIRAO GRANDE;SP|RIBEIRAO PIRES;SP|RIBEIRAO PRETO;SP|RIFAINA;SP|RINCAO;SP|RINOPOLIS;SP|RIO CLARO;SP|RIO DAS PEDRAS;SP|RIO GRANDE DA SERRA;SP|RIOLANDIA;SP|RIVERSUL;SP|ROSANA;SP|ROSEIRA;SP|RUBIACEA;SP|RUBIAO JUNIOR;SP|RUBINEIA;SP|SABINO;SP|SAGRES;SP|SALES;SP|SALES OLIVEIRA;SP|SALESOPOLIS;SP|SALMOURAO;SP|SALTINHO;SP|SALTO;SP|SALTO DE PIRAPORA;SP|SALTO GRANDE;SP|SANDOVALINA;SP|SANTA ADELIA;SP|SANTA ALBERTINA;SP|SANTA BARBARA D OESTE;SP|SANTA BRANCA;SP|SANTA CLARA D OESTE;SP|SANTA CRUZ DA CONCEICAO;SP|SANTA CRUZ DA ESPERANCA;SP|SANTA CRUZ DAS PALMEIRAS;SP|SANTA CRUZ DO RIO PARDO;SP|SANTA ERNESTINA;SP|SANTA FE DO SUL;SP|SANTA GERTRUDES;SP|SANTA ISABEL;SP|SANTA LUCIA;SP|SANTA MARIA DA SERRA;SP|SANTA MERCEDES;SP|SANTA RITA D OESTE;SP|SANTA RITA DO PASSA QUATRO;SP|SANTA ROSA DE VITERBO;SP|SANTA SALETE;SP|SANTANA DA PONTE PENSA;SP|SANTANA DE PARNAIBA;SP|SANTELMO;SP|SANTO ANASTACIO;SP|SANTO ANDRE;SP|SANTO ANTONIO DA ALEGRIA;SP|SANTO ANTONIO DE POSSE;SP|SANTO ANTONIO DO ARACANGUA;SP|SANTO ANTONIO DO JARDIM;SP|SANTO ANTONIO DO PINHAL;SP|SANTO EXPEDITO;SP|SANTOPOLIS DO AGUAPEI;SP|SANTOS;SP|SAO BENEDITO DA CACHOEIRINHA;SP|SAO BENEDITO DAS AREIAS;SP|SAO BENTO DO SAPUCAI;SP|SAO BERNARDO DO CAMPO;SP|SAO CAETANO DO SUL;SP|SAO CARLOS;SP|SAO FRANCISCO;SP|SAO FRANCISCO XAVIER;SP|SAO JOAO DA BOA VISTA;SP|SAO JOAO DAS DUAS PONTES;SP|SAO JOAO DE IRACEMA;SP|SAO JOAO DO PAU D ALHO;SP|SAO JOAQUIM DA BARRA;SP|SAO JOSE DA BELA VISTA;SP|SAO JOSE DAS LARANJEIRAS;SP|SAO JOSE DO BARREIRO;SP|SAO JOSE DO RIO PARDO;SP|SAO JOSE DO RIO PRETO;SP|SAO JOSE DOS CAMPOS;SP|SAO LOURENCO DA SERRA;SP|SAO LOURENCO DO TURVO;SP|SAO LUIZ DO PARAITINGA;SP|SAO MANUEL;SP|SAO MIGUEL ARCANJO;SP|SAO PAULO;SP|SAO PEDRO;SP|SAO PEDRO DO TURVO;SP|SAO ROQUE;SP|SAO SEBASTIAO;SP|SAO SEBASTIAO DA GRAMA;SP|SAO SIMAO;SP|SAO VICENTE;SP|SARAPUI;SP|SARUTAIA;SP|SEBASTIANOPOLIS DO SUL;SP|SERRA AZUL;SP|SERRA NEGRA;SP|SERRANA;SP|SERTAOZINHO;SP|SETE BARRAS;SP|SEVERINIA;SP|SILVEIRAS;SP|SIMONSEN;SP|SOCORRO;SP|SOROCABA;SP|SUD MENNUCCI;SP|SUMARE;SP|SUSSUI;SP|SUZANAPOLIS;SP|SUZANO;SP|TABAPUA;SP|TABATINGA;SP|TABOAO DA SERRA;SP|TACIBA;SP|TAGUAI;SP|TAIACU;SP|TAIUVA;SP|TALHADO;SP|TAMBAU;SP|TANABI;SP|TAPIRAI;SP|TAPIRATIBA;SP|TAQUARAL;SP|TAQUARITINGA;SP|TAQUARITUBA;SP|TAQUARIVAI;SP|TARABAI;SP|TARUMA;SP|TATUI;SP|TAUBATE;SP|TECAINDA;SP|TEJUPA;SP|TEODORO SAMPAIO;SP|TERRA ROXA;SP|TIETE;SP|TIMBURI;SP|TORRE DE PEDRA;SP|TORRINHA;SP|TRABIJU;SP|TREMEMBE;SP|TRES FRONTEIRAS;SP|TUIUTI;SP|TUPA;SP|TUPI PAULISTA;SP|TURIUBA;SP|TURMALINA;SP|UBARANA;SP|UBATUBA;SP|UBIRAJARA;SP|UCHOA;SP|UNIAO PAULISTA;SP|URANIA;SP|URU;SP|URUPES;SP|VALENTIM GENTIL;SP|VALINHOS;SP|VALPARAISO;SP|VANGLORIA;SP|VARGEM;SP|VARGEM GRANDE DO SUL;SP|VARGEM GRANDE PAULISTA;SP|VARPA;SP|VARZEA PAULISTA;SP|VERA CRUZ;SP|VINHEDO;SP|VIRADOURO;SP|VISTA ALEGRE DO ALTO;SP|VITORIA BRASIL;SP|VOTORANTIM;SP|VOTUPORANGA;SP|ZACARIAS`;

const cidadesAtendidasAccert = cidadesAccertTexto.split(";").map((item) => {
  const [uf, cidade] = item.split("|");
  return { cidade, uf };
});

const cidadesBaseComplementar = [
  { cidade: "Rio Branco", uf: "AC" },
  { cidade: "Macapá", uf: "AP" },
  { cidade: "Manaus", uf: "AM" },
  { cidade: "Fortaleza", uf: "CE" },
  { cidade: "Vitória", uf: "ES" },
  { cidade: "São Luís", uf: "MA" },
  { cidade: "Cuiabá", uf: "MT" },
  { cidade: "Campo Grande", uf: "MS" },
  { cidade: "Belo Horizonte", uf: "MG" },
  { cidade: "Uberlândia", uf: "MG" },
  { cidade: "Belém", uf: "PA" },
  { cidade: "João Pessoa", uf: "PB" },
  { cidade: "Curitiba", uf: "PR" },
  { cidade: "Londrina", uf: "PR" },
  { cidade: "Maringá", uf: "PR" },
  { cidade: "Recife", uf: "PE" },
  { cidade: "Rio de Janeiro", uf: "RJ" },
  { cidade: "Natal", uf: "RN" },
  { cidade: "Porto Alegre", uf: "RS" },
  { cidade: "Florianópolis", uf: "SC" },
  { cidade: "Aracaju", uf: "SE" },
  { cidade: "Palmas", uf: "TO" },
  { cidade: "Barra do Garças", uf: "MT" },
  { cidade: "Pontal do Araguaia", uf: "MT" },
  { cidade: "Aragarças", uf: "GO" },
  { cidade: "Água Boa", uf: "MT" },
  { cidade: "Nova Xavantina", uf: "MT" },
  { cidade: "Querência", uf: "MT" },
  { cidade: "Canarana", uf: "MT" },
  { cidade: "Ribeirão Cascalheira", uf: "MT" },
  { cidade: "Rondonópolis", uf: "MT" },
  { cidade: "Primavera do Leste", uf: "MT" },
  { cidade: "Confresa", uf: "MT" },
];

const cidadesImportadasAccert = true;
const accertCidadesSet = new Set(cidadesAtendidasAccert.map((local) => normalizarTexto(`${local.uf}|${local.cidade}`)));

const cidadesDisponiveis = Array.from(
  new Map([...cidadesAtendidasAccert, ...cidadesBaseComplementar, ...cidadesVip].map((local) => [`${local.uf}|${normalizarTexto(local.cidade)}`, local])).values()
).sort((a, b) => `${a.uf}-${a.cidade}`.localeCompare(`${b.uf}-${b.cidade}`, "pt-BR"));

function localPorChave(chave) {
  if (!chave || chave === "__cep__") return null;

  const partes = chave.split("|");
  if (partes[0] === "__digitada__") {
    const cidade = partes[1];
    const uf = partes[2];
    return cidade && uf ? { cidade, uf } : null;
  }

  const [cidade, uf] = partes;
  return cidade && uf ? { cidade, uf } : null;
}

function chaveLocal(local) {
  return `${local.cidade}|${local.uf}`;
}

const cenariosTeste = [
  {
    nome: "JAMEF: consultar prazo quando vazio",
    origemCep: "74900-000",
    destinoCep: "72800-000",
    peso: 18,
    comprimento: 0.6,
    largura: 0.4,
    altura: 0.3,
    volumes: 2,
    valorNota: 1850,
    temTde: false,
  },
  {
    nome: "JAMEF: TDE aplicada quando usuário informa sim",
    origemCep: "74900-000",
    destinoCep: "72800-000",
    peso: 18,
    comprimento: 0.6,
    largura: 0.4,
    altura: 0.3,
    volumes: 2,
    valorNota: 1850,
    temTde: true,
  },
  {
    nome: "CEP identifica cidade de destino",
    origemCep: "74900-000",
    destinoCep: "01000-000",
    peso: 10,
    comprimento: 0.3,
    largura: 0.3,
    altura: 0.3,
    volumes: 1,
    valorNota: 1000,
    temTde: false,
  },
  {
    nome: "JAMEF: CEP com zero à esquerda não quebra",
    origemCep: "74900-000",
    destinoCep: "01000-000",
    peso: 12,
    comprimento: 0.4,
    largura: 0.3,
    altura: 0.25,
    volumes: 1,
    valorNota: 2500,
    temTde: false,
  },
  {
    nome: "JAMEF: acima de 100 kg usa valor por kg",
    origemCep: "74900-000",
    destinoCep: "72800-000",
    peso: 120,
    comprimento: 0.4,
    largura: 0.4,
    altura: 0.4,
    volumes: 1,
    valorNota: 4000,
    temTde: false,
  },
  {
    nome: "Escolha manual de cidade quando CEP não identifica",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Aparecida de Goiânia|GO",
    destinoManual: "São Paulo|SP",
    peso: 12,
    comprimento: 0.4,
    largura: 0.3,
    altura: 0.25,
    volumes: 1,
    valorNota: 2500,
    temTde: false,
  },
  {
    nome: "Busca por cidade sem depender do CEP",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Aparecida de Goiânia|GO",
    destinoManual: "Brasília|DF",
    peso: 15,
    comprimento: 0.4,
    largura: 0.3,
    altura: 0.3,
    volumes: 2,
    valorNota: 3000,
    temTde: false,
  },
  {
    nome: "ACCERT: calcula rota com nova tabela cadastrada",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Goiânia|GO",
    destinoManual: "Barueri|SP",
    peso: 20,
    comprimento: 0.4,
    largura: 0.4,
    altura: 0.4,
    volumes: 1,
    valorNota: 2000,
    temTde: false,
  },
  {
    nome: "EXPRESS VIP: calcula rota a partir de Aparecida de Goiânia",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Aparecida de Goiânia|GO",
    destinoManual: "Rondonópolis|MT",
    peso: 50,
    comprimento: 0.4,
    largura: 0.4,
    altura: 0.4,
    volumes: 2,
    valorNota: 2000,
    temTde: true,
  },
  {
    nome: "CAIAPÓ: calcula rota Goiânia x São Paulo",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Goiânia|GO",
    destinoManual: "São Paulo|SP",
    peso: 80,
    comprimento: 0.5,
    largura: 0.4,
    altura: 0.3,
    volumes: 2,
    valorNota: 3000,
    temTde: false,
  },
  {
    nome: "Cálculo individual retorna apenas uma transportadora",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Goiânia|GO",
    destinoManual: "Barueri|SP",
    peso: 20,
    comprimento: 0.4,
    largura: 0.4,
    altura: 0.4,
    volumes: 1,
    valorNota: 2000,
    temTde: false,
    transportadoraFiltro: "ACCERT",
  },
  {
    nome: "Cidade da base sem rota sinaliza sem atendimento",
    origemCep: "00000-000",
    destinoCep: "99999-999",
    origemManual: "Goiânia|GO",
    destinoManual: "Cuiabá|MT",
    peso: 20,
    comprimento: 0.4,
    largura: 0.4,
    altura: 0.4,
    volumes: 1,
    valorNota: 2000,
    temTde: false,
  },
];

function moeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function numero(valor) {
  const limpo = String(valor ?? "").trim().replace(/\./g, "").replace(",", ".");
  const convertido = Number(limpo);
  return Number.isFinite(convertido) ? convertido : 0;
}

function limparCep(cep) {
  const apenasNumeros = String(cep ?? "").replace(/\D/g, "").padStart(8, "0").slice(0, 8);
  return apenasNumeros;
}

function buscarCidadePorCep(cep) {
  const cepTexto = limparCep(cep);
  return cidadesPorCep.find((item) => cepTexto >= item.cepInicial && cepTexto <= item.cepFinal) || null;
}

function textoCidade(local) {
  if (!local) return "CEP não identificado";
  return `${local.cidade}/${local.uf}`;
}

function selecionarFaixaJamef(faixas, pesoCobrado) {
  if (pesoCobrado <= 10) return faixas.ate10;
  if (pesoCobrado <= 20) return faixas.ate20;
  if (pesoCobrado <= 30) return faixas.ate30;
  if (pesoCobrado <= 50) return faixas.ate50;
  if (pesoCobrado <= 75) return faixas.ate75;
  if (pesoCobrado <= 100) return faixas.ate100;
  return pesoCobrado * faixas.acima100Kg;
}

function calcularJamef(t, origem, destino, pesoCobrado, nf, temTde) {
  const freteBase = selecionarFaixaJamef(t.faixas, pesoCobrado);
  const taxaAdValorem = Math.max(nf * t.adValorem, 15.96);
  const taxaGris = Math.max(nf * 0.00102, 15.96);
  const pedagio = Math.max(Math.ceil(pesoCobrado / 100), 1) * 16.14;
  const taxaCtrc = 13.55;
  const tas = origem.uf !== destino.uf ? 22.04 : 0;
  const subtotalComponentes = freteBase + taxaAdValorem + taxaGris + pedagio + taxaCtrc + tas;
  const taxaTde = temTde ? Math.min(Math.max(subtotalComponentes, 760.44), 5242.27) : 0;
  const tec = subtotalComponentes * 0.0375;
  const subtotalSemIcms = subtotalComponentes + taxaTde + tec;
  const valorIcms = subtotalSemIcms * t.icms;

  return { freteBase, taxaAdValorem, taxaGris, pedagio, taxaCtrc, tas, tec, taxaTde, valorIcms, total: subtotalSemIcms + valorIcms };
}

function calcularAccert(t, pesoCobrado, nf, temTde) {
  const fretePorPeso = (pesoCobrado / 1000) * t.valorTonelada;
  const freteBase = Math.max(fretePorPeso, t.freteMinimo);
  const taxaGris = nf * t.gris;
  const taxaAdValorem = 0;
  const pedagio = Math.max(Math.ceil(pesoCobrado / 100), 1) * t.pedagioPor100Kg;
  const taxaCtrc = 0;
  const tas = 0;
  const tec = 0;
  const taxaTde = temTde ? t.tdeMinimo : 0;
  const subtotalSemIcms = freteBase + taxaGris + t.despacho + pedagio + taxaTde;
  const valorIcms = subtotalSemIcms * t.icms;

  return { freteBase, taxaAdValorem, taxaGris, pedagio, taxaCtrc, tas, tec, taxaTde, valorIcms, total: subtotalSemIcms + valorIcms };
}

function calcularVip(t, pesoCobrado, nf, temTde) {
  const fretePorPeso = pesoCobrado * t.valorKg;
  const freteBase = Math.max(fretePorPeso, t.freteMinimo);
  const taxaAdValorem = nf * t.percentualNF;
  const taxaGris = 0;
  const pedagio = Math.max(Math.ceil(pesoCobrado / 100), 1) * t.pedagioPor100Kg;
  const taxaCtrc = 0;
  const tas = 0;
  const tec = 0;
  const taxaTde = temTde ? t.tdeMinimo : 0;
  const subtotalSemIcms = freteBase + taxaAdValorem + pedagio + taxaTde;
  const valorIcms = subtotalSemIcms * t.icms;

  return { freteBase, taxaAdValorem, taxaGris, pedagio, taxaCtrc, tas, tec, taxaTde, valorIcms, total: subtotalSemIcms + valorIcms };
}

function selecionarFaixaCaiapo(faixas, pesoCobrado) {
  if (pesoCobrado <= 50) return faixas.ate50;
  if (pesoCobrado <= 100) return faixas.ate100;
  if (pesoCobrado <= 150) return faixas.ate150;
  if (pesoCobrado <= 200) return faixas.ate200;
  if (pesoCobrado <= 250) return faixas.ate250;
  if (pesoCobrado <= 300) return faixas.ate300;
  return faixas.ate300 + (pesoCobrado - 300) * faixas.garantiaPeso;
}

function calcularCaiapo(t, pesoCobrado, nf, temTde) {
  const freteBase = selecionarFaixaCaiapo(t.faixas, pesoCobrado);
  const taxaAdValorem = nf * t.freteValor;
  const taxaGris = 0;
  const pedagio = t.pedagio;
  const taxaCtrc = 0;
  const tas = 0;
  const tec = 0;
  const taxaTde = temTde ? t.tdeMinimo : 0;
  const subtotalSemIcms = freteBase + taxaAdValorem + pedagio + taxaTde;
  const valorIcms = subtotalSemIcms * t.icms;

  return { freteBase, taxaAdValorem, taxaGris, pedagio, taxaCtrc, tas, tec, taxaTde, valorIcms, total: subtotalSemIcms + valorIcms };
}

function calcularFretes({ origemCep, destinoCep, origemManual, destinoManual, peso, comprimento, largura, altura, volumes, valorNota, temTde, transportadoraFiltro = "TODAS" }) {
  const origem = localPorChave(origemManual) || buscarCidadePorCep(origemCep);
  const destino = localPorChave(destinoManual) || buscarCidadePorCep(destinoCep);
  const pesoReal = Math.max(numero(peso), 0);
  const c = Math.max(numero(comprimento), 0);
  const l = Math.max(numero(largura), 0);
  const a = Math.max(numero(altura), 0);
  const qtd = Math.max(numero(volumes), 1);
  const nf = Math.max(numero(valorNota), 0);

  if (!origem || !destino) return { origem, destino, fretes: [], coberturaSemValor: [], naoAtende: [] };

  const transportadorasFiltradas =
    transportadoraFiltro === "TODAS"
      ? transportadorasAtivas
      : transportadorasAtivas.filter((t) => t.transportadora === transportadoraFiltro);

  const transportadorasUnicas = Array.from(new Set(transportadorasFiltradas.map((t) => t.transportadora)));

  const fretes = transportadorasFiltradas
    .filter(
      (t) =>
        cidadeIgualOperacional(t.origemCidade, origem.cidade) &&
        t.origemUF === origem.uf &&
        ((t.estadosGrupo || []).includes(destino.uf) || t.todoEstado || (t.cidadesGrupo || []).some((cidade) => cidadeIgualOperacional(cidade, destino.cidade)) || cidadeIgualOperacional(t.destinoCidade, destino.cidade)) &&
        ((t.estadosGrupo || []).includes(destino.uf) || t.destinoUF === destino.uf)
    )
    .map((t) => {
      const pesoCubado = c * l * a * t.fatorCubagem * qtd;
      const pesoCobrado = Math.max(pesoReal, pesoCubado);
      const calculado =
        t.tipoTabela === "jamef_faixa"
          ? calcularJamef(t, origem, destino, pesoCobrado, nf, temTde)
          : t.tipoTabela === "vip_kg_percentual"
          ? calcularVip(t, pesoCobrado, nf, temTde)
          : t.tipoTabela === "caiapo_faixa"
          ? calcularCaiapo(t, pesoCobrado, nf, temTde)
          : calcularAccert(t, pesoCobrado, nf, temTde);

      return {
        ...t,
        prazoTexto: t.prazo ? `${t.prazo} dias` : PRAZO_PADRAO,
        pesoCubado,
        pesoCobrado,
        coleta: "Inclusa",
        atendeRegiao: true,
        ...calculado,
      };
    })
    .sort((a, b) => a.total - b.total);

  const accertJaTemValor = fretes.some((frete) => frete.transportadora === "ACCERT");
  const destinoAtendidoAccert = accertCidadesSet.has(normalizarTexto(`${destino.uf}|${destino.cidade}`));
  const filtroIncluiAccert = transportadoraFiltro === "TODAS" || transportadoraFiltro === "ACCERT";
  const accertAtende = filtroIncluiAccert && cidadesImportadasAccert && !accertJaTemValor && origem.uf === "GO" && destinoAtendidoAccert;
  const coberturaSemValor = accertAtende
    ? [
        {
          transportadora: "ACCERT",
          nome: `ACCERT - ${origem.cidade}/${origem.uf} x ${destino.cidade}/${destino.uf}`,
          mensagem: "Atende esta região, porém a tabela de valor dessa cidade ainda precisa ser cadastrada",
          prazoTexto: PRAZO_PADRAO,
        },
      ]
    : [];

  const transportadorasComAtendimento = new Set([...fretes.map((frete) => frete.transportadora), ...coberturaSemValor.map((item) => item.transportadora)]);
  const naoAtende = transportadorasUnicas
    .filter((nome) => !transportadorasComAtendimento.has(nome))
    .map((nome) => ({ transportadora: nome, mensagem: "Não atende esta região" }));

  return { origem, destino, fretes, coberturaSemValor, naoAtende };
}

function Icone({ tipo, className = "" }) {
  const icones = {
    caminhão: "🚚",
    calculadora: "🧮",
    caixa: "📦",
    check: "✅",
    relogio: "⏱️",
    dinheiro: "💰",
    alvo: "🎯",
    teste: "🧪",
    entrega: "🏠",
    alerta: "⚠️",
  };
  return <span className={`inline-flex items-center justify-center ${className}`} aria-hidden="true">{icones[tipo] || "•"}</span>;
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border bg-white shadow-sm ${className}`}>{children}</div>;
}

function Campo({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
      />
    </div>
  );
}

function normalizarTexto(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function normalizarCidadeOperacional(cidade) {
  const normalizada = normalizarTexto(cidade);
  if (normalizada === "goiania" || normalizada === "aparecida de goiania") {
    return "goiania_aparecida";
  }
  return normalizada;
}

function cidadeIgualOperacional(a, b) {
  return normalizarCidadeOperacional(a) === normalizarCidadeOperacional(b);
}

function SelectCidade({ label, value, onChange }) {
  const [busca, setBusca] = useState("");
  const buscaNormalizada = normalizarTexto(busca);
  const cidadesFiltradas = cidadesDisponiveis.filter((local) => {
    const texto = normalizarTexto(`${local.cidade} ${local.uf}`);
    return texto.includes(buscaNormalizada);
  });

  const buscaLimpa = busca.trim().replace(/[ ]+/g, " ");
  const ufDigitada = buscaLimpa.slice(-2).toUpperCase();
  const cidadeDigitada = buscaLimpa.slice(0, -2).replace(/[,-]$/, "").trim();
  const podeUsarDigitada = cidadeDigitada.length >= 2 && /^[A-Z]{2}$/.test(ufDigitada);
  const chaveDigitada = podeUsarDigitada ? `__digitada__|${cidadeDigitada}|${ufDigitada}` : "";
  const jaExisteNaLista = podeUsarDigitada
    ? cidadesDisponiveis.some((local) => normalizarTexto(local.cidade) === normalizarTexto(cidadeDigitada) && local.uf === ufDigitada)
    : false;

  return (
    <div className="space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>

      <input
        value={busca}
        placeholder="Digite cidade e UF. Ex.: São Paulo SP, Goiânia GO"
        onChange={(e) => setBusca(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
      >
        <option value="__cep__">Usar cidade identificada pelo CEP</option>
        {podeUsarDigitada && !jaExisteNaLista ? (
          <option value={chaveDigitada}>Usar cidade digitada: {cidadeDigitada}/{ufDigitada}</option>
        ) : null}
        {cidadesFiltradas.map((local) => (
          <option key={chaveLocal(local)} value={chaveLocal(local)}>
            {local.cidade}/{local.uf}
          </option>
        ))}
      </select>
      <p className="text-xs text-slate-500">
        {busca
          ? `${cidadesFiltradas.length} cidade(s) encontrada(s). Caso não apareça, digite no formato Cidade UF e selecione “Usar cidade digitada”.`
          : "Digite para filtrar a base ou mantenha a cidade identificada pelo CEP."}
      </p>
    </div>
  );
}

function SeletorTde({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">Existe TDE?</label>
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => onChange(true)} className={`rounded-2xl border px-4 py-3 font-bold transition ${value ? "border-amber-400 bg-amber-100 text-slate-900" : "border-slate-200 bg-white text-slate-600"}`}>Sim</button>
        <button type="button" onClick={() => onChange(false)} className={`rounded-2xl border px-4 py-3 font-bold transition ${!value ? "border-amber-400 bg-amber-100 text-slate-900" : "border-slate-200 bg-white text-slate-600"}`}>Não</button>
      </div>
    </div>
  );
}

function Botao({ children, onClick }) {
  return <button type="button" onClick={onClick} className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-base font-bold text-white transition hover:bg-slate-800 active:scale-[0.99]">{children}</button>;
}

function StatusTeste({ nome, passou, detalhe }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <div>
        <p className="font-bold text-slate-800">{nome}</p>
        <p className="text-xs text-slate-500">{detalhe}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-bold ${passou ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{passou ? "OK" : "ERRO"}</span>
    </div>
  );
}

const nomesTransportadoras = Array.from(new Set(transportadorasAtivas.map((t) => t.transportadora))).sort((a, b) => a.localeCompare(b, "pt-BR"));

export default function CalculadoraFreteOnlineGenerica() {
  const [origemCep, setOrigemCep] = useState("74000-000");
  const [destinoCep, setDestinoCep] = useState("72800-000");
  const [origemManual, setOrigemManual] = useState("__cep__");
  const [destinoManual, setDestinoManual] = useState("__cep__");
  const [peso, setPeso] = useState("18");
  const [comprimento, setComprimento] = useState("0,60");
  const [largura, setLargura] = useState("0,40");
  const [altura, setAltura] = useState("0,30");
  const [volumes, setVolumes] = useState("2");
  const [valorNota, setValorNota] = useState("1850");
  const [temTde, setTemTde] = useState(false);
  const [transportadoraSelecionada, setTransportadoraSelecionada] = useState(nomesTransportadoras[0] || "ACCERT");
  const [transportadoraFiltro, setTransportadoraFiltro] = useState("TODAS");

  const calculo = useMemo(
    () => calcularFretes({ origemCep, destinoCep, origemManual, destinoManual, peso, comprimento, largura, altura, volumes, valorNota, temTde, transportadoraFiltro }),
    [origemCep, destinoCep, origemManual, destinoManual, peso, comprimento, largura, altura, volumes, valorNota, temTde, transportadoraFiltro]
  );
  const resultado = calculo.fretes;
  const naoAtende = calculo.naoAtende || [];
  const coberturaSemValor = calculo.coberturaSemValor || [];
  const melhor = resultado[0];
  const modoCalculoTexto = transportadoraFiltro === "TODAS" ? "Geral: todas as transportadoras" : `Individual: ${transportadoraFiltro}`;

  const testes = useMemo(() => {
    return cenariosTeste.map((cenario) => {
      const calculado = calcularFretes(cenario);
      const calculadoSemTde = calcularFretes({ ...cenario, temTde: false });
      const item = calculado.fretes[0];
      const itemSemTde = calculadoSemTde.fretes[0];
      const ordenado = calculado.fretes.every((frete, index, lista) => index === 0 || frete.total >= lista[index - 1].total);
      const prazoOk = calculado.fretes.every((frete) => frete.prazoTexto === PRAZO_PADRAO);
      const rotaOk = Boolean(calculado.origem && calculado.destino);
      const valoresOk = calculado.fretes.every((frete) => Number.isFinite(frete.total) && frete.total > 0);
      const tdeOk = cenario.temTde && item && itemSemTde ? item.total > itemSemTde.total : true;
      const testeIndividual = cenario.nome.includes("Cálculo individual");
      const individualOk = testeIndividual ? calculado.fretes.every((frete) => frete.transportadora === cenario.transportadoraFiltro) : true;
      const testeSemAtendimento = cenario.nome.includes("sem rota");
      const testeCoberturaPendente = cenario.nome.includes("cobertura pendente");
      const semAtendimentoOk = testeSemAtendimento ? calculado.fretes.length === 0 && (calculado.naoAtende || []).some((x) => x.transportadora === "ACCERT") : true;
      const coberturaPendenteOk = testeCoberturaPendente ? calculado.fretes.length === 0 && (calculado.coberturaSemValor || []).some((x) => x.transportadora === "ACCERT") : true;
      return {
        nome: cenario.nome,
        passou: testeSemAtendimento || testeCoberturaPendente ? Boolean(rotaOk && semAtendimentoOk && coberturaPendenteOk) : Boolean(item && ordenado && prazoOk && rotaOk && valoresOk && tdeOk && individualOk),
        detalhe: item ? `Menor frete: ${item.nome} por ${moeda(item.total)} | Prazo: ${item.prazoTexto}` : "Cidade aceita, mas sem rota com valor cadastrado",
      };
    });
  }, []);

  const aplicarExemploComTde = () => {
    setOrigemCep("74000-000");
    setDestinoCep("72800-000");
    setPeso("18");
    setComprimento("0,60");
    setLargura("0,40");
    setAltura("0,30");
    setVolumes("2");
    setValorNota("1850");
    setTemTde(true);
    setOrigemManual("__cep__");
    setDestinoManual("__cep__");
  };

  const aplicarExemploJamef = () => {
    setOrigemCep("74900-000");
    setDestinoCep("01000-000");
    setPeso("12");
    setComprimento("0,40");
    setLargura("0,30");
    setAltura("0,25");
    setVolumes("1");
    setValorNota("2500");
    setTemTde(false);
    setOrigemManual("__cep__");
    setDestinoManual("__cep__");
  };

  const calcularTodasTransportadoras = () => {
    setTransportadoraFiltro("TODAS");
  };

  const calcularTransportadoraIndividual = () => {
    setTransportadoraFiltro(transportadoraSelecionada);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col gap-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400 text-2xl"><Icone tipo="caminhão" /></div>
              <div>
                <p className="text-sm font-extrabold uppercase tracking-wide text-slate-800">REDE<span className="text-amber-500">EPI</span></p>
                <p className="text-xs font-semibold text-slate-500">Protótipo demonstrativo</p>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Calculadora Online de Frete</h1>
            <p className="mt-2 max-w-2xl text-slate-600">A busca usa o CEP para identificar cidade/UF, mas o cálculo considera a rota cidade a cidade. Coleta sempre inclusa. Agora você pode calcular por transportadora ou comparar todas.</p>
          </div>

          <Card className="min-w-[280px] border-amber-200 bg-amber-50">
            <div className="p-5">
              <p className="text-sm font-semibold text-slate-600">Transportadora recomendada</p>
              <p className="mt-1 text-lg font-extrabold">{melhor?.nome || "Sem rota cadastrada"}</p>
              <p className="mt-2 text-3xl font-black">{melhor ? moeda(melhor.total) : "—"}</p>
              <p className="mt-1 text-sm text-slate-600">Prazo: {melhor?.prazoTexto || PRAZO_PADRAO}</p>
              <p className="mt-1 text-xs font-bold text-slate-500">{modoCalculoTexto}</p>
            </div>
          </Card>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card className="border-slate-100 lg:col-span-1">
            <div className="space-y-5 p-6">
              <div className="flex items-center gap-2"><Icone tipo="calculadora" className="text-xl" /><h2 className="text-xl font-extrabold">Dados da simulação</h2></div>

              <Campo label="CEP de origem" value={origemCep} onChange={setOrigemCep} placeholder="Ex.: 74000-000" />
              <p className="-mt-3 text-xs font-semibold text-slate-500">Origem usada no cálculo: {textoCidade(calculo.origem)}</p>
              <SelectCidade label="Escolher cidade de origem manualmente" value={origemManual} onChange={setOrigemManual} />
              <Campo label="CEP de destino" value={destinoCep} onChange={setDestinoCep} placeholder="Ex.: 72800-000" />
              <p className="-mt-3 text-xs font-semibold text-slate-500">Destino usado no cálculo: {textoCidade(calculo.destino)}</p>
              <SelectCidade label="Escolher cidade de destino manualmente" value={destinoManual} onChange={setDestinoManual} />

              <div className="grid grid-cols-2 gap-3"><Campo label="Peso real kg" value={peso} onChange={setPeso} /><Campo label="Volumes" value={volumes} onChange={setVolumes} /></div>
              <div className="grid grid-cols-3 gap-3"><Campo label="Comp. m" value={comprimento} onChange={setComprimento} /><Campo label="Larg. m" value={largura} onChange={setLargura} /><Campo label="Alt. m" value={altura} onChange={setAltura} /></div>

              <Campo label="Valor da nota fiscal" value={valorNota} onChange={setValorNota} />
              <SeletorTde value={temTde} onChange={setTemTde} />

              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 space-y-3">
                <div>
                  <p className="text-sm font-extrabold text-slate-800">Tipo de cálculo</p>
                  <p className="text-xs text-slate-600">Escolha calcular uma transportadora específica ou comparar todas de uma vez.</p>
                </div>
                <Botao onClick={calcularTodasTransportadoras}>Calcular todas as transportadoras</Botao>
                <div className="grid grid-cols-1 gap-3">
                  <select
                    value={transportadoraSelecionada}
                    onChange={(e) => setTransportadoraSelecionada(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
                  >
                    {nomesTransportadoras.map((nome) => (
                      <option key={nome} value={nome}>{nome}</option>
                    ))}
                  </select>
                  <Botao onClick={calcularTransportadoraIndividual}>Calcular transportadora individual</Botao>
                </div>
                <p className="text-xs font-bold text-slate-700">Modo atual: {modoCalculoTexto}</p>
              </div>
              <Botao onClick={aplicarExemploComTde}>Carregar exemplo ACCERT com TDE</Botao>
              <Botao onClick={aplicarExemploJamef}>Carregar exemplo JAMEF</Botao>

              <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600">
                <p className="font-bold text-slate-800">Regras aplicadas</p>
                <p className="mt-1">1. Sem prazo cadastrado: mostra “Consultar prazo de entrega”.</p>
                <p className="mt-1">2. TDE entra somente se for marcado “Sim”.</p>
                <p className="mt-1">3. TDA desconsiderada.</p>
                <p className="mt-1">4. CEP identifica a cidade, mas também é possível digitar e escolher a cidade pela base de cidades.</p>
                <p className="mt-1">5. ACCERT reativada com a nova tabela percentual cadastrada.</p>
                <p className="mt-1">6. CAIAPÓ: SAO = São Paulo/SP; CPQ = Campinas/SP; GYN = Goiânia/GO; UDI = Uberlândia/MG; BHZ = Belo Horizonte/MG.</p>
                <p className="mt-1">7. Se a transportadora não atender a rota, o sistema sinaliza “Não atende esta região”.</p>
                <p className="mt-1">8. Coleta sempre inclusa.</p>
                <p className="mt-1">9. A conferência de origem/destino ignora acentos, então Aparecida de Goiania e Aparecida de Goiânia funcionam.</p>
              </div>
            </div>
          </Card>

          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <Card className="border-slate-100"><div className="p-5"><Icone tipo="caixa" className="mb-3 text-2xl" /><p className="text-sm text-slate-500">Peso cubado</p><p className="text-2xl font-black">{(melhor?.pesoCubado || 0).toFixed(2)} kg</p></div></Card>
              <Card className="border-slate-100"><div className="p-5"><Icone tipo="check" className="mb-3 text-2xl" /><p className="text-sm text-slate-500">Peso cobrado</p><p className="text-2xl font-black">{(melhor?.pesoCobrado || 0).toFixed(2)} kg</p></div></Card>
              <Card className="border-slate-100"><div className="p-5"><Icone tipo="entrega" className="mb-3 text-2xl" /><p className="text-sm text-slate-500">TDE</p><p className="text-2xl font-black">{melhor ? moeda(melhor.taxaTde) : "—"}</p></div></Card>
              <Card className="border-slate-100"><div className="p-5"><Icone tipo="relogio" className="mb-3 text-2xl" /><p className="text-sm text-slate-500">Prazo</p><p className="text-lg font-extrabold">{melhor?.prazoTexto || PRAZO_PADRAO}</p></div></Card>
            </div>

            <Card className="border-slate-100">
              <div className="p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div><h2 className="text-xl font-extrabold">Comparativo das transportadoras</h2><p className="text-sm text-slate-500">{modoCalculoTexto}. Base demonstrativa com ACCERT, JAMEF, EXPRESS VIP e CAIAPÓ ativas.</p></div>
                  <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold md:flex"><Icone tipo="dinheiro" /> Menor valor no topo</div>
                </div>

                {resultado.length === 0 ? (
                  <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-slate-700">
                    <p className="flex items-center gap-2 text-lg font-extrabold"><Icone tipo="alerta" /> Nenhuma rota cadastrada para esta cidade.</p>
                    <p className="mt-2 text-sm">A cidade existe na base, mas ainda não há tabela de valor cadastrada para cálculo automático.</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {coberturaSemValor.map((item) => (
                        <span key={item.transportadora} className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-700">
                          {item.transportadora}: {item.mensagem}
                        </span>
                      ))}
                      {naoAtende.map((item) => (
                        <span key={item.transportadora} className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-700">
                          {item.transportadora}: {item.mensagem}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resultado.map((item, index) => (
                      <div key={item.nome} className={`flex flex-col gap-4 rounded-3xl border p-4 md:flex-row md:items-center md:justify-between ${index === 0 ? "border-amber-300 bg-amber-50" : "border-slate-100 bg-white"}`}>
                        <div className="flex items-start gap-4">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-2xl font-black ${index === 0 ? "bg-amber-400 text-slate-900" : "bg-slate-100 text-slate-600"}`}>{index + 1}º</div>
                          <div>
                            <p className="text-lg font-extrabold">{item.nome}</p>
                            <p className="text-sm text-slate-500">{item.destaque} · Coleta {item.coleta}{item.regiaoTabela ? ` · Região: ${item.regiaoTabela}` : ""}</p>
                            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                              <span className="rounded-full bg-slate-100 px-3 py-1">Frete base: {moeda(item.freteBase)}</span>
                              {item.despacho ? <span className="rounded-full bg-slate-100 px-3 py-1">Despacho: {moeda(item.despacho)}</span> : null}
                              <span className="rounded-full bg-slate-100 px-3 py-1">Ad Valorem: {moeda(item.taxaAdValorem)}</span>
                              <span className="rounded-full bg-slate-100 px-3 py-1">GRIS: {moeda(item.taxaGris)}</span>
                              <span className="rounded-full bg-slate-100 px-3 py-1">Pedágio: {moeda(item.pedagio)}</span>
                              {item.tas ? <span className="rounded-full bg-slate-100 px-3 py-1">TAS: {moeda(item.tas)}</span> : null}
                              {item.taxaCtrc ? <span className="rounded-full bg-slate-100 px-3 py-1">CTRC: {moeda(item.taxaCtrc)}</span> : null}
                              {item.tec ? <span className="rounded-full bg-slate-100 px-3 py-1">TEC: {moeda(item.tec)}</span> : null}
                              <span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-slate-700">TDE: {moeda(item.taxaTde)}</span>
                              <span className="rounded-full bg-slate-100 px-3 py-1">ICMS 7%: {moeda(item.valorIcms)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 md:text-right">
                          <div><p className="flex items-center gap-1 text-sm text-slate-500 md:justify-end"><Icone tipo="relogio" /> Prazo</p><p className="font-extrabold">{item.prazoTexto}</p></div>
                          <div><p className="text-sm text-slate-500">Frete total</p><p className="text-2xl font-black">{moeda(item.total)}</p></div>
                        </div>
                      </div>
                    ))}
                    {coberturaSemValor.length > 0 ? (
                      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-4">
                        <p className="mb-2 text-sm font-extrabold text-emerald-800">Transportadoras que atendem, mas ainda não têm tabela de valor cadastrada</p>
                        <div className="flex flex-wrap gap-2">
                          {coberturaSemValor.map((item) => (
                            <span key={item.transportadora} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700">
                              {item.transportadora}: {item.mensagem}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {naoAtende.length > 0 ? (
                      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <p className="mb-2 text-sm font-extrabold text-slate-700">Transportadoras sem atendimento para esta rota</p>
                        <div className="flex flex-wrap gap-2">
                          {naoAtende.map((item) => (
                            <span key={item.transportadora} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600">
                              {item.transportadora}: {item.mensagem}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-slate-100 bg-slate-900 text-white"><div className="p-6"><div className="mb-2 flex items-center gap-2"><Icone tipo="alvo" className="text-xl" /><h2 className="text-xl font-extrabold">Objetivo da ferramenta</h2></div><p className="text-slate-200">Reduzir cálculo manual, evitar erro em frete, proteger margem e dar mais velocidade para o comercial responder o cliente.</p></div></Card>
              <Card className="border-slate-100"><div className="p-6"><div className="mb-3 flex items-center gap-2"><Icone tipo="teste" className="text-xl" /><h2 className="text-xl font-extrabold">Testes automáticos</h2></div><div className="space-y-2">{testes.map((teste) => <StatusTeste key={teste.nome} {...teste} />)}</div></div></Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
