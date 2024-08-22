'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import type { INavSelectorProps } from './nav-selector'
import NavSelector from './nav-selector'
import classNames from '@/utils/classnames'
import { useStore as useAppStore } from '@/app/components/app/store'

type INavProps = {
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  text: string
  activeSegment: string | string[]
  link: string
  isApp: boolean
} & INavSelectorProps

const Nav = ({
  icon,
  activeIcon,
  text,
  activeSegment,
  link,
  curNav,
  navs,
  createText,
  onCreate,
  onLoadmore,
  isApp,
}: INavProps) => {
  const setAppDetail = useAppStore(state => state.setAppDetail)
  const [hovered, setHovered] = useState(false)
  const segment = useSelectedLayoutSegment()
  const isActived = Array.isArray(activeSegment) ? activeSegment.includes(segment!) : segment === activeSegment

  return (
    <div className={`
      flex items-center h-12 text-sm shrink-0 font-medium px-8
    `}>
      {/* ${isActived && 'bg-components-main-nav-nav-button-bg-active shadow-md font-semibold'} */}
      {/* ${!curNav && !isActived && 'hover:bg-components-main-nav-nav-button-bg-hover'} */}
      <Link href={link}>
        <div
          onClick={() => setAppDetail()}
          className={classNames(`
            flex items-center h-11 px-0 text-base cursor-pointer text-gray-50 min-w-25
            ${!curNav && !isActived && 'hover:border-b-2 hover:border-gray-50'}
            ${isActived && 'border-b-2 border-gray-50'}
          `)}
          // ${isActived ? 'text-components-main-nav-nav-button-text-active' : 'text-components-main-nav-nav-button-text'}
          // 'hover:bg-components-main-nav-nav-button-bg-active-hover'
          // ${curNav && isActived && 'hover:boarder-2'}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* <div className='mr-2'>
            {
              (hovered && curNav)
                ? <ArrowNarrowLeft className='w-4 h-4' />
                : isActived
                  ? activeIcon
                  : icon
            }
          </div> */}
          {text}
        </div>
      </Link>
      {
        curNav && isActived && (
          <>
            <div className='font-light text-gray-300 '>/</div>
            <NavSelector
              isApp={isApp}
              curNav={curNav}
              navs={navs}
              createText={createText}
              onCreate={onCreate}
              onLoadmore={onLoadmore}
            />
          </>
        )
      }
    </div>
  )
}

export default Nav
