import Image from "next/image";
const imageSrc = require(`../public/bg.jpg`);

export default function Test() {
  return (
    <section>
      <h1>Hello World</h1>
      <Image src={imageSrc} width={500} height={500} alt="Dynamic Image" />

      {/* <TestButton /> */}
      {/* <Flex gap="small" wrap="wrap">
        <OTP />
      </Flex> */}
    </section>
  );
}
