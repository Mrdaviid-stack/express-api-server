/**
 * Helper Functions
 * 
 * @author Mark David Bogayan <mrkdvdbgyn@gmail.com>
 * 
 */

export function dateFormat(date) {

  date = !date ? new Date() : new Date(date)
  return date.toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: 'numeric' })

}

export function millisecondsToTime(milliseconds, as12hour) {

  const ms = milliseconds % 1000
  milliseconds = ( milliseconds - ms ) / 1000

  const seconds = milliseconds % 60
  milliseconds = ( milliseconds - seconds ) / 60

  const minutes = milliseconds % 60
  const hours = ( milliseconds - minutes ) / 60

  const minutesString = minutes.toString().padStart(2, '0')
  const secondsString = seconds.toString().padStart(2, '0')

  if (!as12hour)
    return `${hours}:${minutesString}:${secondsString}`

  const isPM = hours > 12
    return (
      hours === 0 ? 12 : ( isPM ? hours - 12 : hours )
        + `:${minutesString}:${secondsString} ${isPM ? 'PM' : 'AM' }`
    )

}

export function timeToMilliseconds(time) {

  const parts = time.split(':')
  let milliseconds = 0

  for ( let i in parts )
    milliseconds += parts[i] * Math.pow(60, parts.length - i -1)
  
  milliseconds = milliseconds * 1000

  return milliseconds

}
