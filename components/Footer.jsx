import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = ({isDarkMode}) => {
  return (
    <div className='mt-5'>
      <div className='text-center'>
        <Image src={isDarkMode ? assets.logo_dark_svg : assets.logo_svg} alt='Shreerama logo' className='w-56 mx-auto mb-2'/>

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} alt='Email icon' className='w-6'/>
            <a href="mailto:shreerama9official+portfolio@gmail.com">shreerama9official@gmail.com</a>
        </div>
      </div>

    <div className='text-center sm:flex items-center justify-between border-t bordet border-gray-400 mx-[10%] mt-12 py-6'>
        <p> Let’s connect and build something impactful. </p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a href="tel:+918837580847">Phone</a></li>
            <li><a target='_blank' href="https://github.com/shreerama9">GitHub</a></li>
            <li><a target='_blank' href="https://linkedin.com/in/shreerama9">LinkedIn</a></li>
            <li><a target='_blank' href="https://x.com/b55138">Twitter</a></li>
            <li><a target='_blank' href="https://discord.gg/pNpkyzPS">Discord</a></li>
            

        </ul>
    </div>

    </div>
  )
}

export default Footer
