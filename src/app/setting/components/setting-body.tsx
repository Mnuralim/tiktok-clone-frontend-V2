import { RiArrowRightSLine } from '@react-icons/all-files/ri/RiArrowRightSLine'
import React from 'react'
import { AiFillLock, AiOutlineCopyrightCircle, AiOutlineEdit } from 'react-icons/ai'
import { RxPerson } from 'react-icons/rx'
import { TbCoin } from 'react-icons/tb'
import { LiaLanguageSolid } from 'react-icons/lia'
import { BiHelpCircle, BiLogIn } from 'react-icons/bi'
import { BsShieldCheck } from 'react-icons/bs'
import { MdOutlineHomeRepairService } from 'react-icons/md'
import { LuBookMinus } from 'react-icons/lu'
import { LogoutButton } from '@/components/button/logout-button'

const SettingBody = () => {
  return (
    <div className="flex flex-col px-3 mt-5 gap-3 mb-16">
      <div className="border-b pb-6">
        <h2 className="text-[#A4A4A4] uppercase text-sm font-semibold">Account</h2>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <RxPerson size="23" className="font-semibold" color="#A4A4A4" />
            <span>Manage account</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <AiFillLock size="23" className="font-semibold" color="#A4A4A4" />
            <span>Privacy</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <TbCoin size="23" className="font-semibold" color="#A4A4A4" />
            <span>Get Coins</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
      </div>
      <div className="border-b pb-6">
        <h2 className="text-[#A4A4A4] uppercase text-sm font-semibold">General</h2>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <LiaLanguageSolid size="23" className="font-semibold" color="#A4A4A4" />
            <span>Language</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
      </div>
      <div className="border-b pb-6">
        <h2 className="text-[#A4A4A4] uppercase text-sm font-semibold">Support</h2>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <AiOutlineEdit size="23" className="font-semibold" color="#A4A4A4" />
            <span>Report a problem</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <BiHelpCircle size="23" className="font-semibold" color="#A4A4A4" />
            <span>Help Center</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <BsShieldCheck size="23" className="font-semibold" color="#A4A4A4" />
            <span>Safety Center</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
      </div>
      <div className="border-b pb-6">
        <h2 className="text-[#A4A4A4] uppercase text-sm font-semibold">About tiktok</h2>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <AiOutlineEdit size="23" className="font-semibold" color="#A4A4A4" />
            <span>Community Guidelines</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <MdOutlineHomeRepairService size="23" className="font-semibold" color="#A4A4A4" />
            <span>Terms of Service</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <LuBookMinus size="23" className="font-semibold" color="#A4A4A4" />
            <span>Privacy Policy</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <AiOutlineCopyrightCircle size="23" className="font-semibold" color="#A4A4A4" />
            <span>Copyright Policy</span>
          </div>
          <RiArrowRightSLine size="25" color="#A4A4A4" />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <BiLogIn size="23" className="font-semibold" color="#A4A4A4" />
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingBody
