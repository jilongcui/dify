import type { FC } from 'react'
import { PdfHighlighter, PdfLoader } from 'react-pdf-highlighter'
import 'react-pdf-highlighter/dist/style.css'
import { t } from 'i18next'
import { RiCloseLine, RiZoomInLine, RiZoomOutLine } from '@remixicon/react'
import React, { useState } from 'react'
import { useChatWithHistoryContext } from '../context'
import useBreakpoints from '@/hooks/use-breakpoints'
import Tooltip from '@/app/components/base/tooltip'
import Loading from '@/app/components/base/loading'

type InnerPdfPreviewProps = {
  url: string
  onCancel: () => void
}

const InnerPdfPreview: FC<InnerPdfPreviewProps> = ({ url, onCancel }) => {
  const media = useBreakpoints()
  const [scale, setScale] = useState(1)

  const {
    isMobile,
  } = useChatWithHistoryContext()

  const zoomIn = () => {
    setScale((prev) => {
      const newScale = Math.min(prev * 1.2, 10)
      console.log('Zoom In to: ', newScale) // 调试用
      return newScale
    })
  }

  const zoomOut = () => {
    setScale((prev) => {
      const newScale = Math.max(prev / 1.2, 0.5)
      console.log('Zoom Out to: ', newScale) // 调试用
      return newScale
    })
  }

  // createPortal
  return (
    <div className={`relative w-full h-full ${!isMobile && 'p-8'}`}>
      <div className="relative inset-0 w-full h-full overflow-hidden"
        style={{ transform: 'scale(1)', transformOrigin: 'center', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <PdfLoader
          workerSrc="/pdf.worker.min.mjs"
          url={url}
          beforeLoad={<div className="flex justify-center items-center h-64"><Loading type="app" /></div>}
        >
          {pdfDocument => (
            <PdfHighlighter
              pdfDocument={pdfDocument}
              pdfScaleValue={String(scale)}
              enableAreaSelection={event => event.altKey}
              scrollRef={() => {}}
              onScrollChange={() => {}}
              onSelectionFinished={() => null}
              highlightTransform={() => <div />}
              highlights={[]}
            />
          )}
        </PdfLoader>
      </div>
      <Tooltip popupContent={t('common.operation.zoomOut')}>
        <div className="absolute top-2 right-24 flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer" onClick={zoomOut}>
          <RiZoomOutLine className="w-4 h-4 text-gray-500" />
        </div>
      </Tooltip>
      <Tooltip popupContent={t('common.operation.zoomIn')}>
        <div className="absolute top-2 right-16 flex items-center justify-center w-8 h-8 rounded-lg cursor-pointer" onClick={zoomIn}>
          <RiZoomInLine className="w-4 h-4 text-gray-500" />
        </div>
      </Tooltip>
      <Tooltip popupContent={t('common.operation.cancel')}>
        <div className="absolute top-2 right-6 flex items-center justify-center w-8 h-8 bg-white/8 rounded-lg backdrop-blur-[2px] cursor-pointer" onClick={onCancel}>
          <RiCloseLine className="w-4 h-4 text-gray-500" />
        </div>
      </Tooltip>
    </div>
  )
}

export default InnerPdfPreview
