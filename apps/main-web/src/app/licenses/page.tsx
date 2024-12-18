import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/components/ui/alert-dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';

import { Button } from '@repo/ui/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const frontEndLibraries = [
  { name: 'Turborepo', version: '2.1.3' },
  { name: 'Next.js', version: '14.2.6' },
  { name: 'lucide-react', version: '' },
  { name: 'TypeScript', version: '5.3.3' },
  { name: 'Tailwind CSS', version: '3.4.1' },
  { name: 'react-hook-form', version: '7.53.1' },
  { name: 'zod', version: '3.23.8' },
  { name: 'shadcn/ui', version: '' },
  { name: 'exif', version: '2.3.0' },
  { name: 'firebase', version: '11.0.2' },
  { name: 'lottie-react', version: '2.4.0' },
  { name: 'next-s3-upload', version: '0.3.4' },
  { name: 'swiper', version: '11.1.14' },
  { name: 'use-bounce', version: '10.0.4' },
  { name: 'framer-motion', version: '11.11.11' },
  { name: 'Node.js', version: '18+' },
];

const backEndLibraries = [
  { name: 'spring-boot', version: '3.2.11' },
  { name: 'spring-dependency-management', version: '1.1.6' },
  { name: 'spring-boot-starter-data-jpa', version: '' },
  { name: 'spring-boot-starter-web', version: '' },
  { name: 'spring-boot-starter-security', version: '' },
  { name: 'spring-boot-starter-mail', version: '' },
  { name: 'spring-boot-starter-data-redis', version: '' },
  { name: 'spring-boot-starter-data-mongodb', version: '' },
  { name: 'spring-boot-starter-data-mongodb-reactive', version: '' },
  { name: 'spring-data-elasticsearch', version: '4.4.0' },
  { name: 'springdoc-openapi-starter-webmvc-ui', version: '2.0.2' },
  { name: 'mongodb-driver-reactivestreams', version: '4.11.4' },
  { name: 'spring-cloud-starter-netflix-eureka-client', version: '' },
  { name: 'spring-cloud-starter-netflix-eureka-server', version: '' },
  { name: 'spring-cloud-config-server', version: '' },
  { name: 'spring-cloud-starter-openfeign', version: '' },
  { name: 'spring-kafka', version: '' },
  { name: 'firebase-admin', version: '9.4.1' },
  { name: 'caffeine', version: '' },
  { name: 'lombok', version: '' },
];

const externalServices = [
  {
    serviceName: '카카오 맵 API',
    url: 'https://github.com/kakao/kakao.github.io?tab=readme-ov-file',
    license: 'MIT license',
  },
  {
    serviceName: '구글 로그인 API',
    url: 'https://github.com/google/google-authenticator',
    license: 'Apache License 2.0',
  },
  {
    serviceName: '카카오 로그인 API',
    url: 'https://github.com/kakao/kakao.github.io?tab=readme-ov-file',
    license: 'MIT license',
  },
  {
    serviceName: '네이버 로그인 API',
    url: 'https://github.com/naver/naveridlogin-sdk-android',
    license: 'Apache License 2.0',
  },
];

export default function page() {
  return (
    <main className="w-full">
      <section className="bg-lookids text-white px-6 py-12">
        <div className="flex items-center gap-1">
          <Link href="/">
            <ChevronLeft size={30} className="cursor-pointer" />
          </Link>
          <h1 className="text-4xl font-bold mb-2">오픈소스 라이선스</h1>
        </div>
        <p className="text-lg opacity-90 pl-9">Lookids Licenses</p>
      </section>

      <Card className="mt-8">
        <CardHeader className="pb-0">
          <CardTitle>
            <p className="pb-1 text-2xl font-bold">the seed</p>
            <p className="text-sm text-muted-foreground">
              루키즈는 반려동물을 키우는 사람들이 그들의 특별한 순간을 공유하고
              소통할 수 있는 전문 SNS 플랫폼을 만드는 것을 목표로 합니다.
              반려동물의 사진과 이야기로 소통하며, 사용자 간의 유대감을 강화하고
              반려동물 중심의 커뮤니티를 형성하고자 합니다.
            </p>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 pt-4">
          <section className="flex flex-col gap-4 !mt-0">
            <h3 className="text-xl font-semibold">Open source license</h3>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white border-lookids text-lookids hover:bg-lookids border py-5 hover:text-white sm:p-2 w-[30%]"
                  >
                    <p className="text-xs">MIT 라이선스</p>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>MIT 라이선스</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-1">
                      <span>Copyright (c) 2024 lookids.online</span>
                      <span>
                        본 소프트웨어 및 관련 문서 파일(이하 “소프트웨어”)의
                        사본을 취득하는 모든 사람에게 무료로 소프트웨어를 사용,
                        복사, 수정, 병합, 게시, 배포, 재실시, 판매할 수 있는
                        권리를 포함하여 소프트웨어를 제한 없이 다룰 수 있는
                        권한을 무료로 부여합니다. 단, 다음 조건을 충족해야
                        합니다: 위 저작권 표시와 이 허가 표시가 소프트웨어의
                        모든 사본 또는 중요한 부분에 포함되어야 합니다. 본
                        소프트웨어는 “있는 그대로” 제공되며, 명시적이든
                        묵시적이든 어떠한 종류의 보증도 제공되지 않습니다.
                        여기에는 상품성, 특정 목적에의 적합성 및 비침해성에 대한
                        보증이 포함되지만 이에 국한되지 않습니다. 저자는 어떠한
                        경우에도 소프트웨어와 관련되거나 소프트웨어의 사용 또는
                        기타 거래에서 발생하는 어떠한 청구, 손해 또는 기타
                        책임에 대해 책임을 지지 않습니다.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className="bg-white border-lookids text-lookids hover:bg-lookids w-1/5 rounded-[12px] border py-5 hover:text-white sm:p-2">
                      확인
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white border-lookids text-lookids hover:bg-lookids border py-5 hover:text-white sm:p-2 w-[30%]"
                  >
                    <p className="text-xs">MIT License</p>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>MIT licenses</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col gap-1">
                      <span>Copyright (c) 2024 lookids.online</span>
                      <span>
                        Permission is hereby granted, free of charge, to any
                        person obtaining a copy of this software and associated
                        documentation files (the "Software"), to deal in the
                        Software without restriction, including without
                        limitation the rights to use, copy, modify, merge,
                        publish, distribute, sublicense, and/or sell copies of
                        the Software, and to permit persons to whom the Software
                        is furnished to do so, subject to the following
                        conditions: The above copyright notice and this
                        permission notice shall be included in all copies or
                        substantial portions of the Software. THE SOFTWARE IS
                        PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
                        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
                        COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
                        OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
                        OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH
                        THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                        SOFTWARE.
                      </span>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction className="bg-white border-lookids text-lookids hover:bg-lookids w-1/5 rounded-[12px] border py-5 hover:text-white sm:p-2">
                      OK
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className="text-lg font-semibold">Front-End</p>
            <ul className="space-y-2">
              {frontEndLibraries.map((lib, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">{lib.name}</span>
                  {lib.version && (
                    <span className="ml-2 text-muted-foreground">
                      {lib.version}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold">Back-End</p>
            <ul className="space-y-2">
              {backEndLibraries.map((lib, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">{lib.name}</span>
                  {lib.version && (
                    <span className="ml-2 text-muted-foreground">
                      {lib.version}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="max-w-full flex flex-col gap-4 !mt-0">
            <h3 className="text-xl font-semibold">External Services</h3>
            {externalServices.map((service, index) => (
              <div key={index} className="flex flex-col gap-1">
                <p className="text-sm">
                  {service.serviceName} - {service.license}
                </p>
                <ul className="flex flex-col gap-1 text-xs">
                  <Link
                    href={`${service.url}`}
                    target="_blank"
                    className="text-[#0000EE]"
                  >
                    {service.url}
                  </Link>
                </ul>
              </div>
            ))}
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
