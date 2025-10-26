# Task 1

## 1.1) Xác định bối cảnh dự án

Trong bối cảnh hiện nay, việc quản lý và giám sát xe đưa đón học sinh tại các thành phố lớn là một thách thức lớn đối với nhà trường, phụ huynh, cũng như tài xế. Các vấn đề như **trễ giờ, lạc đường, thiếu thông tin liên lạc, hoặc không cập nhật được vị trí xe theo thời gian thực** có thể gây ảnh hưởng trực tiếp đến sự an toàn của học sinh, uy tín của nhà trường, và áp lực tâm lý cho phụ huynh.  

Do đó, dự án **SSB 1.0** được triển khai nhằm giải quyết các khó khăn này và xây dựng một hệ thống quản lý minh bạch, hiệu quả, hiện đại.

---

### Các bên liên quan chính

#### 1. Nhà trường / Ban quản lý xe buýt
- **Nhu cầu**:
  - Quản lý tổng thể đội xe, tài xế và lịch trình đưa đón học sinh.  
  - Đảm bảo tính an toàn, minh bạch trong việc vận hành xe buýt.  
  - Có công cụ giám sát theo thời gian thực để xử lý nhanh khi có sự cố.  

- **Vấn đề hiện tại**:
  - Quản lý thủ công (qua điện thoại, bảng excel) dễ sai sót, chậm trễ.  
  - Khó nắm bắt vị trí xe khi có sự cố, không đủ thông tin để điều phối.  

- **Lợi ích từ SSB 1.0**:
  - Quản lý tập trung, trực quan qua hệ thống.  
  - Theo dõi được vị trí xe buýt theo thời gian thực (chậm tối đa 3 giây).  
  - Tự động gửi thông báo và cảnh báo → giảm gánh nặng giám sát thủ công.  

---

#### 2. Tài xế xe buýt
- **Nhu cầu**:
  - Nhận lịch làm việc và danh sách học sinh cần đón/trả rõ ràng.  
  - Có công cụ báo cáo tình trạng hành trình nhanh chóng.  
  - Có kênh liên lạc minh bạch với nhà trường và phụ huynh.  

- **Vấn đề hiện tại**:
  - Lịch trình cập nhật chậm hoặc thiếu rõ ràng.  
  - Khó báo cáo kịp thời khi có sự cố hoặc học sinh vắng mặt.  

- **Lợi ích từ SSB 1.0**:
  - Ứng dụng hỗ trợ xem lịch làm việc hằng ngày.  
  - Cập nhật danh sách học sinh cần đón trả theo tuyến.  
  - Gửi cảnh báo ngay khi xảy ra sự cố.  
  - Giúp tài xế giảm áp lực, tập trung vào lái xe an toàn.  

---

#### 3. Phụ huynh học sinh
- **Nhu cầu**:
  - Biết chính xác con mình đang ở đâu và khi nào đến/trả.  
  - Nhận thông báo khi xe sắp đến gần để chuẩn bị.  
  - Được cảnh báo ngay khi xe bị trễ hoặc gặp sự cố.  

- **Vấn đề hiện tại**:
  - Thiếu thông tin kịp thời, phải gọi điện hỏi trực tiếp.  
  - Không yên tâm về sự an toàn của con khi di chuyển bằng xe buýt.  

- **Lợi ích từ SSB 1.0**:
  - Theo dõi vị trí xe buýt của con theo thời gian thực.  
  - Tự động nhận thông báo khi xe sắp tới điểm đón/trả.  
  - Nhận cảnh báo tức thời nếu xe bị trễ → yên tâm hơn, giảm lo lắng.  

---

#### 4. Học sinh (người thụ hưởng cuối cùng)
- **Nhu cầu**:
  - Được đưa đón an toàn, đúng giờ.  
  - Tránh tình huống bị bỏ quên hoặc chờ đợi lâu tại điểm đón.  

- **Vấn đề hiện tại**:
  - Có thể bị lạc, xuống nhầm điểm hoặc bị bỏ quên khi thiếu giám sát.  

- **Lợi ích từ SSB 1.0**:
  - Được theo dõi sát sao hơn, giảm nguy cơ xảy ra sự cố.  
  - Tăng độ tin cậy và an toàn khi đến trường.  

---

### Kết luận
Hệ thống **SSB 1.0** mang lại lợi ích đồng bộ cho tất cả các bên:
- **Nhà trường**: giảm tải công tác quản lý, nâng cao uy tín.  
- **Tài xế**: công việc rõ ràng, thuận tiện, giảm áp lực liên lạc.  
- **Phụ huynh**: an tâm, nắm rõ thông tin, giảm lo lắng.  
- **Học sinh**: an toàn, đúng giờ, được chăm sóc tốt hơn.  

> Dự án không chỉ giải quyết **pain points** hiện tại của từng bên, mà còn tạo nên một **hệ sinh thái giám sát vận hành xe buýt hiện đại, minh bạch và đáng tin cậy.**

---

## 1.2) Yêu cầu hệ thống

### Yêu cầu chức năng (Functional Requirements)

**Đối với Quản lý xe buýt (Nhà trường):**
- FR1: Xem danh sách học sinh, tài xế, xe buýt và tuyến đường.  
- FR2: Tạo và cập nhật lịch trình xe (theo tuần/tháng).  
- FR3: Phân công tài xế và xe buýt cho từng tuyến đường.  
- FR4: Theo dõi vị trí xe buýt theo thời gian thực (≤ 3 giây).  
- FR5: Gửi tin nhắn đến tài xế hoặc phụ huynh.  

**Đối với Tài xế:**
- FR6: Xem lịch làm việc hàng ngày.  
- FR7: Xem danh sách học sinh cần đón/trả và điểm đón.  
- FR8: Báo cáo trạng thái đã đón/trả học sinh.  
- FR9: Gửi cảnh báo khi có sự cố.  

**Đối với Phụ huynh:**
- FR10: Theo dõi vị trí xe buýt con mình.  
- FR11: Nhận thông báo khi xe đến gần điểm đón/trả.  
- FR12: Nhận cảnh báo khi xe bị trễ hoặc có sự cố.  

---

### Yêu cầu phi chức năng (Non-Functional Requirements)
- NFR1: Hiệu năng – Hệ thống phải cập nhật vị trí xe buýt tối đa trễ 3 giây.  
- NFR2: Khả năng mở rộng – Có thể quản lý nhiều tuyến xe, nhiều trường học.  
- NFR3: Tính bảo mật – Dữ liệu học sinh và vị trí xe phải được bảo mật (mã hóa).  
- NFR4: Tính khả dụng – Hệ thống phải hoạt động liên tục ≥ 99% uptime.  
- NFR5: Khả năng tương thích – Ứng dụng phải chạy trên web, Android, iOS.  
- NFR6: Dễ sử dụng – Giao diện trực quan, dễ thao tác cho phụ huynh và tài xế.  
- NFR7: Khả năng phục hồi – Hệ thống phải tự động khôi phục khi mất kết nối GPS/Internet.  

📌 **Biểu đồ Use Case:**  
![Biểu đồ Use-Case](image/usecase1-2.png)

---

## 1.3) Use Case - Hệ thống Quản lý Xe Buýt

## 1. Xem tổng quan danh sách học sinh, tài xế, xe buýt và tuyến đường
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Xem tổng quan danh sách học sinh, tài xế, xe buýt và tuyến đường |
| **Tác nhân**     | Quản lý xe buýt |
| **Mô tả**        | Cho phép quản lý xem toàn bộ thông tin học sinh, tài xế, xe buýt và tuyến đường để có cái nhìn tổng quan. |
| **Tiền điều kiện** | Hệ thống đã có dữ liệu học sinh, tài xế, xe buýt, tuyến đường. |
| **Hậu điều kiện** | Quản lý có thể nắm được danh sách hiện tại và trạng thái của các đối tượng. |
| **Luồng sự kiện** | 1. Quản lý đăng nhập vào hệ thống.<br>2. Chọn chức năng 'Xem danh sách'.<br>3. Hệ thống hiển thị danh sách.<br>4. Quản lý có thể tìm kiếm, lọc, xem chi tiết. |
| **Ngoại lệ**      | 2a. Dữ liệu trống hoặc chưa được nhập → 'Không có dữ liệu'. |

---

## 2. Tạo và cập nhật lịch trình xe (tuần/tháng)
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Tạo và cập nhật lịch trình xe (tuần/tháng) |
| **Tác nhân**     | Quản lý xe buýt |
| **Mô tả**        | Quản lý có thể tạo mới hoặc cập nhật lịch trình di chuyển cho xe buýt theo tuần hoặc tháng. |
| **Tiền điều kiện** | Hệ thống có dữ liệu xe buýt, tài xế và tuyến đường. |
| **Hậu điều kiện** | Lịch trình được lưu, hiển thị cho tài xế và liên quan đến tuyến đường đã chọn. |
| **Luồng sự kiện** | 1. Quản lý chọn chức năng 'Lịch trình'.<br>2. Nhập thông tin: ngày, giờ, tuyến đường, xe buýt, tài xế.<br>3. Tạo mới hoặc chỉnh sửa lịch trình.<br>4. Hệ thống lưu và cập nhật.<br>5. Tài xế nhận thông báo. |
| **Ngoại lệ**      | 2a. Nhập thiếu thông tin → Báo lỗi.<br>3a. Lịch trình không tồn tại → 'Không tìm thấy lịch trình'. |

---

## 3. Phân công tài xế, xe buýt cho tuyến đường
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Phân công tài xế, xe buýt cho tuyến đường |
| **Tác nhân**     | Quản lý xe buýt |
| **Mô tả**        | Quản lý gán xe buýt và tài xế cho tuyến cụ thể. |
| **Tiền điều kiện** | Hệ thống có dữ liệu tuyến đường, xe buýt, tài xế. |
| **Hậu điều kiện** | Xe buýt và tài xế được gán vào tuyến đường, thông tin được lưu. |
| **Luồng sự kiện** | 1. Quản lý chọn 'Phân công'.<br>2. Chọn tuyến đường.<br>3. Chọn xe buýt, tài xế.<br>4. Lưu dữ liệu.<br>5. Tài xế nhận thông báo. |
| **Ngoại lệ**      | 3a. Không có xe/tài xế rảnh → 'Không có phương tiện khả dụng'.<br>4a. Lỗi lưu dữ liệu → 'Phân công thất bại'. |

---

## 4. Cập nhật vị trí xe theo thời gian thực
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Cập nhật vị trí của các xe buýt theo thời gian thực |
| **Tác nhân**     | Quản lý xe buýt, Hệ thống GPS |
| **Mô tả**        | Hệ thống lấy dữ liệu từ GPS để cập nhật vị trí xe buýt liên tục (≤3 giây). |
| **Tiền điều kiện** | Xe buýt được gắn thiết bị GPS. |
| **Hậu điều kiện** | Vị trí hiển thị trên bản đồ cho quản lý và phụ huynh. |
| **Luồng sự kiện** | 1. GPS gửi dữ liệu.<br>2. Hệ thống xử lý và cập nhật bản đồ.<br>3. Người dùng theo dõi. |
| **Ngoại lệ**      | 1a. GPS mất kết nối → Hiển thị vị trí cuối cùng và cảnh báo.<br>2a. Dữ liệu lỗi → Bỏ qua, ghi log. |

---

## 5. Gửi tin nhắn cho tài xế hoặc phụ huynh
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Gửi tin nhắn cho tài xế hoặc phụ huynh |
| **Tác nhân**     | Quản lý xe buýt |
| **Mô tả**        | Quản lý có thể gửi thông báo hoặc tin nhắn trực tiếp cho tài xế hoặc phụ huynh. |
| **Tiền điều kiện** | Tài xế và phụ huynh đã được đăng ký trong hệ thống. |
| **Hậu điều kiện** | Tin nhắn đến người nhận và được hiển thị trong ứng dụng. |
| **Luồng sự kiện** | 1. Quản lý chọn 'Gửi tin nhắn'.<br>2. Nhập nội dung và chọn người nhận.<br>3. Hệ thống gửi tin nhắn qua app hoặc SMS.<br>4. Người nhận nhận được. |
| **Ngoại lệ**      | 2a. Người nhận không tồn tại → 'Không tìm thấy người dùng'.<br>3a. Lỗi mạng → 'Thử lại sau'. |

---

## 6. Xem lịch làm việc hàng ngày
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Xem lịch làm việc hàng ngày |
| **Tác nhân**     | Tài xế |
| **Mô tả**        | Tài xế đăng nhập để xem lịch trình công việc trong ngày. |
| **Tiền điều kiện** | Quản lý đã phân công lịch trình. |
| **Hậu điều kiện** | Tài xế biết các tuyến đường, giờ chạy và xe buýt được phân công. |
| **Luồng sự kiện** | 1. Tài xế đăng nhập.<br>2. Chọn 'Lịch làm việc'.<br>3. Hệ thống hiển thị công việc. |
| **Ngoại lệ**      | 3a. Không có lịch trình → 'Không có công việc hôm nay'. |

---

## 7. Xem danh sách học sinh cần đón và điểm đón
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Xem danh sách học sinh cần đón và điểm đón |
| **Tác nhân**     | Tài xế |
| **Mô tả**        | Tài xế có thể xem danh sách học sinh cần đón cùng điểm đón. |
| **Tiền điều kiện** | Quản lý đã nhập danh sách học sinh cho tuyến. |
| **Hậu điều kiện** | Tài xế biết chính xác học sinh nào cần đón ở điểm nào. |
| **Luồng sự kiện** | 1. Tài xế đăng nhập.<br>2. Chọn tuyến đường.<br>3. Hệ thống hiển thị danh sách học sinh. |
| **Ngoại lệ**      | 2a. Không có học sinh → 'Không có học sinh cho tuyến này'. |

---

## 8. Báo cáo tình trạng đã đón/trả học sinh
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Báo cáo tình trạng đã đón/trả học sinh |
| **Tác nhân**     | Tài xế |
| **Mô tả**        | Tài xế cập nhật trạng thái đã đón hoặc đã trả học sinh. |
| **Tiền điều kiện** | Danh sách học sinh đã được phân công. |
| **Hậu điều kiện** | Quản lý và phụ huynh nhận được thông tin trạng thái. |
| **Luồng sự kiện** | 1. Tài xế mở danh sách.<br>2. Chọn học sinh, cập nhật trạng thái.<br>3. Hệ thống lưu và đồng bộ. |
| **Ngoại lệ**      | 2a. Lỗi cập nhật dữ liệu → 'Không thể lưu trạng thái'. |

---

## 9. Gửi cảnh báo nếu xảy ra sự cố
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Gửi cảnh báo nếu xảy ra sự cố |
| **Tác nhân**     | Tài xế |
| **Mô tả**        | Tài xế gửi cảnh báo đến quản lý và phụ huynh khi xảy ra sự cố. |
| **Tiền điều kiện** | Tài xế đang trong ca làm việc. |
| **Hậu điều kiện** | Quản lý và phụ huynh nhận cảnh báo kịp thời. |
| **Luồng sự kiện** | 1. Tài xế chọn 'Gửi cảnh báo'.<br>2. Nhập nội dung hoặc chọn loại sự cố.<br>3. Hệ thống gửi cảnh báo. |
| **Ngoại lệ**      | 2a. Lỗi mạng → 'Thử lại sau'. |

---

## 10. Theo dõi vị trí xe buýt con mình đang đi
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Theo dõi vị trí xe buýt con mình đang đi |
| **Tác nhân**     | Phụ huynh |
| **Mô tả**        | Phụ huynh theo dõi vị trí thời gian thực của xe buýt con đang đi. |
| **Tiền điều kiện** | Xe buýt có GPS và hệ thống hoạt động. |
| **Hậu điều kiện** | Phụ huynh biết vị trí hiện tại của xe. |
| **Luồng sự kiện** | 1. Phụ huynh đăng nhập.<br>2. Chọn học sinh/xe buýt.<br>3. Hệ thống hiển thị bản đồ. |
| **Ngoại lệ**      | 3a. Mất tín hiệu GPS → 'Không có dữ liệu'. |

---

## 11. Nhận thông báo khi xe đến gần
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Nhận thông báo khi xe đến gần |
| **Tác nhân**     | Phụ huynh |
| **Mô tả**        | Hệ thống gửi thông báo cho phụ huynh khi xe sắp đến điểm đón. |
| **Tiền điều kiện** | Xe đang hoạt động trên tuyến. |
| **Hậu điều kiện** | Phụ huynh được thông báo trước khi xe đến. |
| **Luồng sự kiện** | 1. Hệ thống theo dõi xe.<br>2. Khi gần điểm đón → Gửi thông báo. |
| **Ngoại lệ**      | 1a. Xe đi sai tuyến → Không gửi thông báo. |

---

## 12. Nhận cảnh báo nếu xe bị trễ
| Mục             | Nội dung |
|-----------------|----------|
| **Tên Use Case** | Nhận cảnh báo nếu xe bị trễ |
| **Tác nhân**     | Phụ huynh |
| **Mô tả**        | Phụ huynh nhận cảnh báo nếu xe buýt đến muộn hơn dự kiến. |
| **Tiền điều kiện** | Xe có lịch trình và GPS hoạt động. |
| **Hậu điều kiện** | Phụ huynh được thông báo về sự chậm trễ. |
| **Luồng sự kiện** | 1. Hệ thống so sánh thời gian thực tế với lịch trình.<br>2. Nếu trễ → Gửi cảnh báo. |
| **Ngoại lệ**      | 1a. GPS không khả dụng → 'Không xác định được trễ'. |

📌 **Biểu đồ Use Case tổng quan:**  
![Biểu đồ Use Case](image/usecase1-3.png)
