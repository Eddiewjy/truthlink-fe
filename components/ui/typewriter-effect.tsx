'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TypewriterEffectProps {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
}

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000
}: TypewriterEffectProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[currentWordIndex]
    const targetText = currentWord.text

    let timeout: NodeJS.Timeout

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(targetText.substring(0, displayText.length - 1))

        if (displayText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }, deleteSpeed)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(targetText.substring(0, displayText.length + 1))

        if (displayText === targetText) {
          setTimeout(() => {
            setIsDeleting(true)
          }, delayBetweenWords)
        }
      }, typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [
    displayText,
    currentWordIndex,
    isDeleting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords
  ])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  if (words.length === 0) return null

  const currentWord = words[currentWordIndex]

  return (
    <div className={cn('inline-flex items-center', className)}>
      <span className={currentWord.className}>{displayText}</span>
      <motion.span
        className={cn(
          'inline-block h-6 w-[2px] bg-current ml-1',
          cursorClassName
        )}
        animate={{
          opacity: showCursor ? 1 : 0
        }}
        transition={{
          duration: 0
        }}
      />
    </div>
  )
}

export interface TypewriterEffectSmoothProps {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
  typeSpeed?: number
  deleteSpeed?: number
  delayBetweenWords?: number
}

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000
}: TypewriterEffectSmoothProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (words.length === 0) return

    const currentWord = words[currentWordIndex]
    const targetText = currentWord.text

    let timeout: NodeJS.Timeout

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(targetText.substring(0, displayText.length - 1))

        if (displayText === '') {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }, deleteSpeed)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(targetText.substring(0, displayText.length + 1))

        if (displayText === targetText) {
          setTimeout(() => {
            setIsDeleting(true)
          }, delayBetweenWords)
        }
      }, typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [
    displayText,
    currentWordIndex,
    isDeleting,
    words,
    typeSpeed,
    deleteSpeed,
    delayBetweenWords
  ])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  if (words.length === 0) return null

  const currentWord = words[currentWordIndex]

  return (
    <div className={cn('flex items-center justify-center my-6', className)}>
      <div className="text-5xl md:text-7xl font-bold leading-tight">
        <span className={currentWord.className}>{displayText}</span>
        <motion.span
          className={cn('inline-block w-1 ml-2', cursorClassName)}
          animate={{
            opacity: showCursor ? 1 : 0
          }}
          transition={{
            duration: 0
          }}
        >
          |
        </motion.span>
      </div>
    </div>
  )
}
