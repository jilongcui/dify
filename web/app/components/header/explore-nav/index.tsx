'use client'

import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import classNames from '@/utils/classnames'
type ExploreNavProps = {
  className?: string
}

const ExploreNav = ({
  className,
}: ExploreNavProps) => {
  const { t } = useTranslation()
  const selectedSegment = useSelectedLayoutSegment()
  const actived = selectedSegment === 'explore'

  return (
    <div className={`
      flex items-center h-12 text-sm shrink-0 font-medium px-8
    `}>
      <Link href="/explore/apps" className={classNames(
        className, 'group', 'px-0', 'text-base', 'text-gray-50',
        // actived && 'bg-components-main-nav-nav-button-bg-active shadow-md',
        actived ? 'border-b-2 border-gray-50' : 'hover:border-b-2 hover:border-gray-50',
        // actived ? 'text-components-main-nav-nav-button-text-active' : 'text-components-main-nav-nav-button-text hover:bg-components-main-nav-nav-button-bg-hover',
      )}>
        {/* {
          actived
            ? <RiPlanetFill className='mr-2 w-4 h-4' />
            : <RiPlanetLine className='mr-2 w-4 h-4' />
        } */}
        {t('common.menus.explore')}
      </Link>
    </div>
  )
}

export default ExploreNav
