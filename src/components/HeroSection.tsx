import Button from './Button/Button';
import Heading from './Headling/Headling';

function HeroSection() {
  return (
    <section className="relative h-[500px] md:h-[500px] lg:h-[650px] flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={`${import.meta.env.BASE_URL}bg-test.jpeg`}
          alt="section-bg"
        />
        <div
          className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
          aria-hidden="true"
        />
      </div>

      <div className="relative max-w-[410px] flex flex-col items-center text-center p-4">
        <Heading tag="h1" className="text-[var(--text-white-color)]">
          Test assignment for front-end developer
        </Heading>

        <p className="text-[var(--text-white-color)] mt-[21px] text-base leading-[26px] tracking-normal">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button className="mt-6">Sign up</Button>
      </div>
    </section>
  );
}

export default HeroSection;
