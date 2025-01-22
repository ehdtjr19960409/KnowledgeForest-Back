package com.knowledgeForest.controller.myPage;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.knowledgeForest.Execute;
import com.knowledgeForest.Result;
import com.knowledgeForest.dao.MyPageDAO;

// 유저 탈퇴
public class MyPageDeleteOkController implements Execute {

	@Override
	public Result execute(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		MyPageDAO mypageDAO = new MyPageDAO();
		Result result = new Result();

//		userNum 변수에 저장
		int userNum = Integer.parseInt(request.getParameter("userNum"));

		System.out.println(userNum);
		
//		유저 데이터 삭제 메소드 실행 - userNum 전달
		mypageDAO.deleteUser(userNum);

//		경로 설정
		result.setPath(request.getContextPath() + "/main.jsp");
		result.setRedirect(true);
		
		return result;
	}

}
