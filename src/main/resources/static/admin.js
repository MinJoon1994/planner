document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/admin/stats');

        if (response.status === 403) {
            alert('관리자 권한이 필요합니다.');
            window.location.href = '/home.html';
            return;
        }

        if (!response.ok) throw new Error('Failed to load stats');

        const stats = await response.json();

        document.getElementById('total-users').textContent = stats.totalUsers.toLocaleString();
        document.getElementById('total-groups').textContent = stats.totalBudgetGroups.toLocaleString();
        document.getElementById('total-tx').textContent = stats.totalTransactions.toLocaleString();
        document.getElementById('total-volume').textContent = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(stats.totalTransactionVolume);

    } catch (error) {
        console.error(error);
        alert('데이터를 불러오는데 실패했습니다.');
    }
});
