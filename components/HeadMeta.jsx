import Head from "next/head";

export default function HeadMeta({ title="GAON 손해사정 | 보상 시뮬레이터", desc="사망·부상·후유장해 기준을 반영한 보상 시뮬레이터. 검사·판사 출신 변호사, 보험사 본사·금감원 출신 손해사정사가 함께합니다." }){
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
