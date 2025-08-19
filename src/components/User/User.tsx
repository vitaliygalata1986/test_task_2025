import type { IUser } from '../../interfaces/user.interface';
import { TooltipLink } from '../Tooltip/TooltipLink/TooltipLink';
import { TooltipText } from '../Tooltip/TooltipText/TooltipText';

function User({ name, email, phone, position, photo }: IUser) {
  return (
    <div className="flex flex-col gap-5 items-center text-center bg-white rounded-2xl p-5">
      <img
        className="w-[70px] h-[70px] rounded-full object-cover"
        src={photo}
        alt={name}
      />
      <TooltipText as="h3" className="text-base">
        {name}
      </TooltipText>
      <div className="flex flex-col text-base leading-[26px] tracking-normal">
        <p>{position}</p>
        <TooltipLink href={`mailto:${email}`}>{email}</TooltipLink>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
    </div>
  );
}

export default User;
