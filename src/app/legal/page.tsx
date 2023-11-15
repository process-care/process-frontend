"use client"

import { Box, Text } from "@chakra-ui/react"
import Image from 'next/image'

import { useMediaQueries } from "@/utils/hooks/mediaqueries"
import heroCover from '@/../public/hero.jpg'
import { PropsWithChildren, ReactPropTypes } from "react"

export default function LegalPage() {
  const { isTablet } = useMediaQueries()
  
  return (
    <div className="grow">
      <Box position="relative" h={isTablet ? "150px" : "200px"}>
        <Box position="absolute" color="white" zIndex="2" top="20px" left={isTablet ? "5%" : "70px"}>
          <Text variant="xxl" fontWeight="900" maxW="1000px" w="auto" textAlign="left" marginLeft="-3px" mb="10px">
            Process
          </Text>
          <Text variant={isTablet ? "currentLight" : "baseline"} maxW="1000px">
            <strong>P</strong>latform for <strong>R</strong>esearch <strong>O</strong>nline and <strong>C</strong>itiz
            <strong>E</strong>n <strong>S</strong>cience <strong>S</strong>urveys <br />
          </Text>
        </Box>

        <Image
          src={heroCover}
          alt="Process cover"
          className="absolute object-cover h-[150px] sm:h-[200px] w-full"
        />
      </Box>

      <div className="h-full">
        <h1 className="mt-10 font-bold text-5xl">Mentions légales</h1>

        <div className="p-10 text-sm font-normal text-left">
          <p>
            Conformément aux dispositions de l&apos;article 6 III 1° de la loi n°2004-575 du 21 juin 2004 pour la 
            confiance dans l&apos;économie numérique, nous vous informons que :
          </p>

          <Section title="Éditeur">
            Le portail public de PROCESS est une publication de l&apos;équipe METHODS du Centre de Recherche Epidémiologie et Statistiques (CRESS) - Université Paris Cité / INSERM / INRAe.<br/>
            <br/>
            Hôpital Hôtel-Dieu - Centre d&apos;épidémiologie clinique<br/>
            1 place du Parvis Notre-Dame<br/>
            75004 Paris<br/>
            <br/>
            Directeurs de la publication: Pr Philippe Ravaud et Viet-Thi Tran
          </Section>

          <Section title="Hébergement">
            Le portail public de PROCESS est hébergé par la Société Scalingo SAS, 15 avenue du Rhin 67100 Strasbourg.
          </Section>

          <Section title="Accès au site">
            Le portail public de PROCESS est accessible en tout endroit, 7j/7, 24h/24 sauf cas de force majeure, 
            interruption programmée ou non et pouvant découler d&apos;une nécessité de maintenance. 
            En cas de modification, interruption ou suspension du site, l&apos;éditeur ne saurait être tenu responsable.
          </Section>

          <Section title="Loi informatique et libertés">
            Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée en 2004, vous bénéficiez 
            d&apos;un droit d&apos;accès et de rectification aux informations qui vous concernent. Vous pouvez exercer ce droit 
            en vous adressant à l&apos;équipe PROCESS :<br/>
            <br/>
            PROCESS @ METHODS du Centre de Recherche Epidémiologie et Statistiques (CRESS)<br/>
            1 place du Parvis Notre-Dame<br/>
            75004 Paris<br/>
            <br/>
            Vous pouvez également vous opposer au traitement des données vous concernant.
          </Section>

          <Section title="Données personnelles">
            S&apos;agissant de données nominatives, les internautes peuvent exercer leurs différents droits (accès, rectification, opposition, 
            effacement, limitation) prévus par la loi n° 2018-493 du 20 juin 2018 à tout moment auprès des responsables de la 
            recherche en écrivant directement à : <a href="mailto:thi.tran-viet@aphp.fr" className="underline text-blue-400">thi.tran-viet@aphp.fr</a><br/>
            <br/>
            Ils ont le droit d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés). 
            De plus, toute information concernant les internautes est traitée de façon confidentielle et n&apos;est jamais transmise à des tiers.
          </Section>

          <Section title="Propriété intellectuelle">
            Les contenus, les textes, les vidéos, les images et les animations du portail sont mis à disposition du public par l&apos;équipe METHODS 
            du Centre de Recherche Epidémiologie et Statistiques (CRESS). Ils sont protégés par le droit de la propriété intellectuelle et 
            sont la propriété exclusive de cette équipe. A ce titre, la reproduction, traduction ou toute autre utilisation de données ou 
            d&apos;informations provenant du portail public PROCESS à des fins autres que de recherches, études personnelles, éducatives et non 
            commerciales, sont subordonnées à l&apos;obtention préalable d&apos;une autorisation écrite de l&apos;équipe METHODS du 
            Centre de Recherche Epidémiologie et Statistiques (CRESS) - Université Paris Cité / INSERM / INRAe.
          </Section>

          <Section title="Contenu du site">
            L&apos;équipe METHODS du Centre de Recherche Epidémiologie et Statistiques (CRESS) s&apos;efforce d&apos;assurer au mieux de ses 
            possibilités l&apos;exactitude et la mise à jour des informations diffusées, au moment de leur mise en ligne sur le portail public de PROCESS. 
            Cependant, elle ne garantit en aucune façon l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur 
            le portail. Les informations présentes sur le portail sont non-contractuelles et peuvent être modifiées à tout moment.<br/>
            <br/>
            Le portail public de PROCESS est régi par la loi française. Les utilisateurs étrangers acceptent formellement l&apos;application 
            de la loi française en visitant ce site et en utilisant tout ou partie des fonctionnalités du site.
          </Section>

          <Section title="Liens">
            Le portail public de PROCESS peut contenir des liens vers des sites de partenaires ou de tiers. Ne disposant d&apos;aucun moyen 
            pour contrôler ces sites, l&apos;équipe METHODS du Centre de Recherche Epidémiologie et Statistiques (CRESS) n&apos;offre aucune garantie 
            quant au respect par ces sites des lois et règlement en vigueur.
          </Section>

          <Section title="À propos des mentions légales">
            Les mentions légales définies sur cette page s&apos;appliquent au portail public de PROCESS et sont susceptibles d&apos;évoluer sans préavis.
          </Section>
        </div>
      </div>
    </div>
    
  )
}

// ---- SUB COMPONENTS

// Component that displays a title and a parapgraphe as the children content
function Section({ title, children }: PropsWithChildren<{ title: string; }>): JSX.Element {
  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="mt-1">{children}</div>
    </div>
  )
}