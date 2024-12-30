export function bufferCommon<T>(saveBufferCallBack: (buffer: T[]) => Promise<void>, batchSize = 10, flushInterval = 5000) {
  const buffer: T[] = []

  async function flushBuffer() {
    if (buffer.length === 0) return

    await saveBufferCallBack(buffer)
    buffer.length = 0
  }

  setInterval(flushBuffer, flushInterval)

  process.on('SIGINT', async () => {
    await flushBuffer()
    process.exit(0)
  })
  process.on('SIGTERM', async () => {
    await flushBuffer()
    process.exit(0)
  })

  return {
    async addDataToBuffer(data: T) {
      buffer.push(data)
      if (buffer.length >= batchSize) {
        await flushBuffer()
      }
    },
    getBuffers() {
      return buffer
    }
  }
}