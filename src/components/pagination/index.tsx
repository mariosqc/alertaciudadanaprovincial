import React, { FC, useEffect } from "react";

import {
  Tag,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  IconButton,
  Flex,
  HStack,
  Divider,
  chakra,
} from "@chakra-ui/react";
import { PaginatioContext } from "@alerta-ciudadana/entity";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "react-feather";

interface PaginatioProps extends PaginatioContext<any> {}

export const Pagination: FC<PaginatioProps> = ({
  changeNumberPerPage,
  goToFirstPage,
  goToLastPage,
  nextPage,
  pagination,
  prevPage,
}) => {
  return (
    <div>
      <Divider my="3" />
      <Flex justifyContent="space-between" px="3">
        <HStack>
          {[10, 25, 50, 100].map((perPage) => {
            console.log(perPage === pagination.perPage);

            return (
              <IconButton
                key={perPage}
                id={perPage === pagination.perPage ? "solid" : "ghost"}
                variant={perPage === pagination.perPage ? "solid" : "ghost"}
                colorScheme="pri"
                onClick={() => changeNumberPerPage(perPage)}
                _focus={{}}
                size="sm"
                aria-label=""
                icon={<>{perPage}</>}
              />
            );
          })}
        </HStack>
        <HStack>
          {/* <IconButton
          size="sm"
          aria-label="fist page"
          icon={<ChevronsLeft size="1.25rem" />}
          colorScheme="pri"
          variant="ghost"
          _focus={{}}
          isDisabled={!pagination.take}
          onClick={goToFirstPage}
        /> */}
          <IconButton
            size="sm"
            aria-label="fist page"
            icon={<ChevronLeft size="1.25rem" />}
            colorScheme="pri"
            variant="ghost"
            _focus={{}}
            isDisabled={!pagination.take}
            onClick={prevPage}
          />
          <Flex>
            <Text userSelect="none" fontSize="sm" fontWeight="medium">
              <chakra.span color="pri.500">
                {pagination.take + 1}-{pagination.skip > pagination.total ? pagination.total : pagination.skip}{" "}
              </chakra.span>{" "}
              de {pagination.total}
            </Text>
          </Flex>
          <IconButton
            size="sm"
            aria-label="last page"
            icon={<ChevronRight size="1.25rem" />}
            colorScheme="pri"
            variant="ghost"
            _focus={{}}
            isDisabled={pagination.skip > pagination.total - 1}
            onClick={nextPage}
          />
          {/* <IconButton
          size="sm"
          aria-label="last page"
          icon={<ChevronsRight size="1.25rem" />}
          colorScheme="pri"
          variant="ghost"
          _focus={{}}
          isDisabled={pagination.skip > pagination.total - 1}
          onClick={goToLastPage}
        /> */}
        </HStack>
      </Flex>
    </div>
  );
};
