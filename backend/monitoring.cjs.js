// Versão CommonJS para monitoring.js
const http = require('http');
const fs = require('fs');
const os = require('os');

// Coletar métricas a cada 5 minutos
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const cpuUsage = os.loadavg()[0];
  
  const metrics = {
    timestamp: new Date().toISOString(),
    memory: {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      systemTotal: Math.round(totalMemory / 1024 / 1024),
      systemFree: Math.round(freeMemory / 1024 / 1024)
    },
    cpu: cpuUsage,
    uptime: process.uptime()
  };
  
  // Criar diretório de logs
  fs.mkdir('logs', { recursive: true }, (err) => {
    if (err && err.code !== 'EEXIST') {
      console.error('Erro ao criar diretório de logs:', err);
      return;
    }
    
    fs.appendFile(
      'logs/metrics.log', 
      JSON.stringify(metrics) + '\n', 
      (err) => {
        if (err) console.error('Erro ao registrar métricas:', err);
      }
    );
  });
}, 300000); // 5 minutos