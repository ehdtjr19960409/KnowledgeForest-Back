document.addEventListener("click", function(event) {
	// 모달 리스트를 닫기
	const modal = document.getElementById("modal-list");
	if (
		!modal.contains(event.target) &&
		event.target.className !== "mypage-div-morebtn"
	) {
		closeModal();
	}
});

function openModal(element) {
	const modal = document.getElementById("modal-list");
	const rect = element.getBoundingClientRect();

	// 모달 위치를 클릭된 img 버튼 근처로 설정
	modal.style.left = `${rect.left}px`;
	modal.style.top = `${rect.bottom + window.scrollY}px`;
	modal.style.display = "block";
}

function closeModal() {
	const modal = document.getElementById("modal-list");
	modal.style.display = "none";
}

// 신청자 모달 열기
function openApplicantModal(studyNum) {
	const url = `${getContextPath()}/mypage/getApplicants.my?studyNum=${studyNum}`;

	fetch(url, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
	})
		.then((response) => response.json()) // 응답을 JSON 형식으로 처리
		.then((data) => {
			const applicantList = document.querySelector(".applicant-list");
			applicantList.innerHTML = "";
			console.log(data.applicants);
			
			data.applicants.forEach((applicant) => {
				console.log(applicant);
				const applicantItem = document.createElement("div");
				applicantItem.classList.add("applicant-item");
				applicantItem.innerHTML = `
          <div class="applicant-inner">
            <span class="applicant-name">${applicant.userNick}</span>
            <p class="applicant-content">${applicant.userDetermination}</p>
            <div class="applicant-actions">
              <button class="accept-btn" onclick="acceptApplicant(${applicant.studyApplyNum})">수락</button>
              <button class="reject-btn" onclick="rejectApplicant(${applicant.studyApplyNum})">거절</button>
            </div>
          </div>
        `;
				applicantList.appendChild(applicantItem);
			});
			document.getElementById("REQUEST-LIST-MODAL").classList.remove("hidden");
		})
		.catch((error) => console.error("Error:", error));
}

// 신청자 모달 닫기
function closeApplicantModal() {
	document.getElementById("REQUEST-LIST-MODAL").classList.add("hidden");
}

/* 루트 경로 담은 함수 */
function getContextPath() {
	var hostIndex = location.href.indexOf(location.host) + location.host.length;
	var contextPath = location.href.substring(
		hostIndex,
		location.href.indexOf("/", hostIndex + 1)
	);

	return contextPath;
}


// 신청자 수락
function acceptApplicant(studyApplyNum) {
  console.log( "studyApplyNum" + studyApplyNum);
	const url = `${getContextPath()}/mypage/mypage-acceptApplicant.my`;
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ studyApplyNum }),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				alert("신청을 수락했습니다.");
			} else {
				alert("신청 수락에 실패했습니다.");
			}
		});
}

// 신청자 거절
function rejectApplicant(studyApplyNum) {
	const url = `${getContextPath()}/mypage/mypage-rejectApplicant.my`;
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ studyApplyNum }),
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.success) {
				alert("신청을 거절했습니다.");
			} else {
				alert("신청 거절에 실패했습니다.");
			}
		});
}
