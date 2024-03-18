import Image from "next/image"
import { Tutor } from "@/models/tutor"


export default function Profile({ profile }: { profile: Tutor }) {
    return (
        <div className="flex flex-col justify-center items-center max-w-[200px]" data-aos="zoom-y-out">
            <Image src={profile.srcImageProfile} alt={`Picture of ${profile.name}`} width={180} height={180} />
            <div className="text-left h-auto my-auto flex flex-col items-center">
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="font-light my-2">{profile.description}</p>
                <Image src={profile.srcImageStartUp} alt={`Logo of startup where work ${profile.name}`} priority width={profile.imageStartUpSize.wight} height={profile.imageStartUpSize.height} />
            </div>
        </div>
    )
}
