import Heading from './Headling/Headling';
import successImg from '/success-image.svg';

const SuccessMessage = () => (
  <section>
    <Heading tag="h2" className="mb-[50px]">
      User successfully registered
    </Heading>
    <img
      src={successImg}
      alt="User successfully registered"
      className="mx-auto"
    />
  </section>
);

export default SuccessMessage;
