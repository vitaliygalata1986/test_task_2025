import Heading from './Headling/Headling';

const SuccessMessage = () => (
  <section>
    <Heading tag="h2" className="mb-[50px]">
      User successfully registered
    </Heading>
    <img
      src={`${import.meta.env.BASE_URL}success-image.svg`}
      alt="User successfully registered"
      className="mx-auto"
    />
  </section>
);

export default SuccessMessage;
